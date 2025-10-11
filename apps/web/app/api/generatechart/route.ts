
import { NextResponse } from "next/server";
import {prisma} from "@repo/db/client"; 
import { getAuthenticatedUser } from "../../../lib/utility/beMiddleware";


// Input type

type GenerateBody = {
  patient_id: string; 
  cuisinePreference?: string[];
  days?: number; 
};



function mapAgeToAgeGroup(age: number): "INFANT" | "CHILD" | "ADOLESCENT" | "ADULT" | "SENIOR" {
  if (age <= 1) return "INFANT";
  if (age <= 12) return "CHILD";
  if (age <= 18) return "ADOLESCENT";
  if (age <= 65) return "ADULT";
  return "SENIOR";
}


function mapMealSlots(mealFrequency: number) {
  const freq = Math.max(1, Math.min(4, mealFrequency));
  if (freq === 1) return ["LUNCH"];
  if (freq === 2) return ["BREAKFAST", "DINNER"];
  if (freq === 3) return ["BREAKFAST", "LUNCH", "DINNER"];
  return ["BREAKFAST", "LUNCH", "SNACKS", "DINNER"];
}


 // rule-based scoring
 
function baseRecipeScore({
  recipe,
  recipeFoods,
  dietaryHabit,
  digestionQuality,
  bowelMovement,
  criticalConditions,
  cuisinePreference,
}: {
  recipe: any;
  recipeFoods: any[];
  dietaryHabit: string;
  digestionQuality: string;
  bowelMovement: string;
  criticalConditions: string[];
  cuisinePreference?: string[];
}) {
  let score = 0;
  const categories = new Set(recipeFoods.map((f: any) => f.category));

  const hasMeat = categories.has("MEAT") || categories.has("FISH");
  const hasEgg = categories.has("EGG");
  const hasDairy = categories.has("DAIRY");

  if (dietaryHabit === "VEGAN") {
    if (hasMeat || hasEgg || hasDairy) return -9999;
    score += 10;
  } else if (dietaryHabit === "VEGETARIAN" || dietaryHabit === "EGGITARIAN") {
    if (hasMeat || categories.has("FISH")) return -9999;
    score += 5;
    if (dietaryHabit === "EGGITARIAN" && hasEgg) score += 2;
  } else {
    score += 2;
  }

  if (cuisinePreference?.length && cuisinePreference.includes(recipe.Cuisine?.name)) {
    score += 4;
  }

  if (digestionQuality === "POOR" && recipeFoods.some((f) => f.digestibility?.name === "LOW")) {
    score -= 6;
  }

  if (
    bowelMovement === "CONSTIPATED" &&
    recipeFoods.some((f) => ["FRUIT", "LEGUME", "GRAIN"].includes(f.category))
  ) {
    score += 2;
  }

  if (
    criticalConditions.some((c) => c.toLowerCase().includes("diabetes")) &&
    categories.has("SWEETENER")
  ) {
    score -= 1000;
  }

  return score;
}


 
function computeRecipeNutrients(recipeFoods: any[]) {
  const totals: Record<string, number> = {};
  for (const f of recipeFoods) {
    for (const fn of f.FoodNutrient || []) {
      totals[fn.nutrient_id] = (totals[fn.nutrient_id] ?? 0) + fn.amount;
    }
  }
  return totals;
}



function rdaContributionScore(
  recipeNutrients: Record<string, number>,
  currentTotals: Record<string, number>,
  rdaRequirements: { nutrient_id: string; amount: number }[]
) {
  let score = 0;

  for (const req of rdaRequirements) {
    const current = currentTotals[req.nutrient_id] ?? 0;
    const target = req.amount;
    const missing = Math.max(0, target - current);

    const contribution = recipeNutrients[req.nutrient_id] ?? 0;

    if (missing > 0 && contribution > 0) {
      const fillRatio = Math.min(1, contribution / missing);
      score += 5 * fillRatio; 
    } else if (current > target * 1.5 && contribution > 0) {
      score -= 2;
    }
  }

  return score;
}



export async function POST(req: Request) {
  try {

    const user = await getAuthenticatedUser(req);

    if(!user){
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
    }

    if(user.userType !== "doctor"){
        return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
    }



    const body = (await req.json()) as GenerateBody;
    const { patient_id, cuisinePreference, days = 7 } = body;


    const dp1 = await prisma.doctorPatient.findFirst({
      where: {
        patient_id,
        doctor_id: user.id
      }
    })

    if(!dp1){
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
    }

    const dp_id = dp1.dp_id;

    if (!dp_id) return NextResponse.json({ error: "dp_id required" }, { status: 400 });


    const dp = await prisma.doctorPatient.findUnique({
      where: { dp_id },
      include: {
        PatientDosha: { include: { dosha: true } },
        ChcPatient: { include: { criticalHealthCondition: true } },
      },
    });
    if (!dp) return NextResponse.json({ error: "DoctorPatient not found" }, { status: 404 });

    const criticalConditions = (dp.ChcPatient || [])
      .map((c: any) => c.criticalHealthCondition?.name)
      .filter(Boolean);

    const mealSlots = mapMealSlots(dp.mealFrequency);

    const rdaRequirements = await prisma.rda.findMany({
      where: {
        gender: dp.gender,
        age_group: mapAgeToAgeGroup(dp.age),
      },
    });

    const recipes = await prisma.recipe.findMany({
      include: {
        Cuisine: true,
        RecipeIngredient: {
          include: {
            food: {
              include: {
                FoodDigestibility: { include: { digestibility: true } },
                FoodNutrient: true,
              },
            },
          },
        },
      },
    });

    if (!recipes.length) return NextResponse.json({ error: "No recipes available" }, { status: 400 });

    const scored = recipes
      .map((r) => {
        const foods = r.RecipeIngredient.map((ri: any) => ri.food);
        const recipeNutrients = computeRecipeNutrients(foods);

        const baseScore = baseRecipeScore({
          recipe: r,
          recipeFoods: foods,
          dietaryHabit: dp.dietaryHabit,
          digestionQuality: dp.digestionQuality,
          bowelMovement: dp.bowelMovement,
          criticalConditions,
          cuisinePreference,
        });

        return { recipe: r, foods, recipeNutrients, baseScore };
      })
      .filter((s) => s.baseScore > -1000);

    const chart = await prisma.dietChart.create({
      data: {
        db_id: dp_id,
        mealSlots: mealSlots as any,
      },
    });

    for (let day = 0; day < days; day++) {
    const dailyTotals: Record<string, number> = {};
    const usedRecipes = new Set<string>();

    for (const meal of mealSlots) {
        const ranked = scored
        .map((s) => {
            const rdaScore = rdaContributionScore(s.recipeNutrients, dailyTotals, rdaRequirements);
            return { ...s, score: s.baseScore + rdaScore + Math.random() * 0.01 };
        })
        .filter((s) => !usedRecipes.has(s.recipe.recipe_id))
        .sort((a, b) => b.score - a.score);

        const pick = ranked[0];
        if (!pick) continue;

        for (const [nutrient, value] of Object.entries(pick.recipeNutrients)) {
        dailyTotals[nutrient] = (dailyTotals[nutrient] ?? 0) + value;
        }

        usedRecipes.add(pick.recipe.recipe_id);

        await prisma.dietChartRecipe.create({
        data: {
            chart_id: chart.chart_id,
            recipe_id: pick.recipe.recipe_id,
            mealTime: meal as any,
            WeekDay: day % 7,
            quantity: 200,
        },
        });
    }
    }


    const created = await prisma.dietChart.findUnique({
      where: { chart_id: chart.chart_id },
      include: {
        DietChartRecipe: {
          include: {
            recipe: {
              include: {
                Cuisine: true,
                RecipeIngredient: { include: { food: true } },
              },
            },
          },
        },
      },
    });

    return NextResponse.json({ success: true, chart: created });
  } catch (err: any) {
    console.error("generateDietChart error:", err);
    return NextResponse.json({ error: err?.message ?? "unknown error" }, { status: 500 });
  }
}
 

