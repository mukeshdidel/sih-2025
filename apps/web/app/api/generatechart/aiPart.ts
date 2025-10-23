
 
export function baseRecipeScore({
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

 
export function computeRecipeNutrients(recipeFoods: any[]) {
  const totals: Record<string, number> = {};
  for (const f of recipeFoods) {
    for (const fn of f.FoodNutrient || []) {
      totals[fn.nutrient_id] = (totals[fn.nutrient_id] ?? 0) + fn.amount;
    }
  }
  return totals;
}

export function mapAgeToAgeGroup(age: number): "INFANT" | "CHILD" | "ADOLESCENT" | "ADULT" | "SENIOR" {
  if (age <= 1) return "INFANT";
  if (age <= 12) return "CHILD";
  if (age <= 18) return "ADOLESCENT";
  if (age <= 65) return "ADULT";
  return "SENIOR";
}


export function mapMealSlots(mealFrequency: number) {
  const freq = Math.max(1, Math.min(4, mealFrequency));
  if (freq === 1) return ["LUNCH"];
  if (freq === 2) return ["BREAKFAST", "DINNER"];
  if (freq === 3) return ["BREAKFAST", "LUNCH", "DINNER"];
  return ["BREAKFAST", "LUNCH", "SNACKS", "DINNER"];
}

export function rdaContributionScore(
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


