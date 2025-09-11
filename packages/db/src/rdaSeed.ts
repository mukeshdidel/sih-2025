// prisma/seed-rda.ts (node script)
import { prisma } from "@repo/db/client";

async function main() {

    // prisma-seed-rda.ts  (snippet)
// NOTE: replac nutrientMap[0]nutrientMap["Protien"] ... with your actual Nutrient IDs

const nutrients = await prisma.nutrient.findMany();
const nutrientMap: { [key: string]: string } = {};
nutrients.forEach(n => {
  nutrientMap[n.name] = n.nutrient_id;
});

console.log(nutrientMap);

const seedRda: Array<{ nutrient_id: string; age_group: "INFANT" | "CHILD" | "ADOLESCENT" | "ADULT" | "SENIOR"; gender: "MALE" | "FEMALE"; amount: number }> = [
  // INFANT (6-12 months) - kcal 660 (ICMR 2020)
  { nutrient_id: nutrientMap["Calories"]!, age_group: "INFANT", gender: "MALE", amount: 660.0 },
  { nutrient_id: nutrientMap["Protien"]!,  age_group: "INFANT", gender: "FEMALE", amount: 10.5 },
  { nutrient_id: nutrientMap[""]!, age_group: "INFANT", gender: "MALE", amount: 10.5 },
  { nutrient_id: nutrientMap[2]!, age_group: "INFANT", gender: "MALE", amount: Math.round((660*0.55)/4*100)/100 }, // ~90.75
  { nutrient_id: nutrientMap[3]!, age_group: "INFANT", gender: "MALE", amount: Math.round((660*0.25)/9*100)/100 }, // ~18.33
  { nutrient_id: nutrientMap[4]!, age_group: "INFANT", gender: "MALE", amount: Math.round((660/1000)*14*100)/100 }, // ~9.24
  { nutrient_id: nutrientMap["Calcium"]!, age_group: "INFANT", gender: "MALE", amount: 500.0 }, // ICMR uses specific child values; 500 mg chosen as 6-12m estimate
  { nutrient_id: nutrientMap["Iron"]!, age_group: "INFANT", gender: "MALE", amount: 11.0 }, // ICMR / WHO 7-12m ~11 mg
  { nutrient_id: nutrientMap["VitaminC"]!, age_group: "INFANT", gender: "MALE", amount: 40.0 }, // conservative infant vitamin C

  // INFANT female
  { nutrient_id: nutrientMap["Calories"]!, age_group: "INFANT", gender: "FEMALE", amount: 660.0 },
  { nutrient_id: nutrientMap["Protbien"]!,  age_group: "INFANT", gender: "FEMALE", amount: 10.5 },
  { nutrient_id: nutrientMap[2]!, age_group: "INFANT", gender: "FEMALE", amount: Math.round((660*0.55)/4*100)/100 },
  { nutrient_id: nutrientMap[3]!, age_group: "INFANT", gender: "FEMALE", amount: Math.round((660*0.25)/9*100)/100 },
  { nutrient_id: nutrientMap[4]!, age_group: "INFANT", gender: "FEMALE", amount: Math.round((660/1000)*14*100)},
  { nutrient_id: nutrientMap["Calcium"]!, age_group: "INFANT", gender: "FEMALE", amount: 500.0 },
  { nutrient_id: nutrientMap["Iron"]!, age_group: "INFANT", gender: "FEMALE", amount: 11.0 },
  { nutrient_id: nutrientMap["VitaminC"]!, age_group: "INFANT", gender: "FEMALE", amount: 40.0 },

  // CHILD (representative 4-6 y): kcal 1360 (ICMR)
  { nutrient_id: nutrientMap["Calories"]!, age_group: "CHILD", gender: "MALE", amount: 1360.0 },
  { nutrient_id: nutrientMap["Protien"]!,  age_group: "CHILD", gender: "MALE", amount: 15.9 }, // from ICMR 4-6 y RDA ~15.9 g
  { nutrient_id: nutrientMap[2]!, age_group: "CHILD", gender: "MALE", amount: Math.round((1360*0.55)/4*100)/100 }, // ~187.00 g
  { nutrient_id: nutrientMap[3]!, age_group: "CHILD", gender: "MALE", amount: Math.round((1360*0.25)/9*100)/100 }, // ~37.78 g
  { nutrient_id: nutrientMap[4]!, age_group: "CHILD", gender: "MALE", amount: Math.round((1360/1000)*14*100)/100 }, // ~19.04 g
  { nutrient_id: nutrientMap["Calcium"]!, age_group: "CHILD", gender: "MALE", amount: 600.0 }, // child Calcium (ICMR child rows range; 600 mg used as conservative)
  { nutrient_id: nutrientMap["Iron"]!, age_group: "CHILD", gender: "MALE", amount: 10.0 }, // approx (ICMR child Iron ~10 mg for 4-8y)
  { nutrient_id: nutrientMap["VitaminC"]!, age_group: "CHILD", gender: "MALE", amount: 40.0 },

  // CHILD female (same energy1approximate)
  { nutrient_id: nutrientMap["Calories"]!, age_group: "CHILD", gender: "FEMALE", amount: 1360.0 },
  { nutrient_id: nutrientMap["Protien"]!,  age_group: "CHILD", gender: "FEMALE", amount: 15.9 },
  { nutrient_id: nutrientMap[2]!, age_group: "CHILD", gender: "FEMALE", amount: Math.round((1360*0.55)/4*100)/100 },
  { nutrient_id: nutrientMap[3]!, age_group: "CHILD", gender: "FEMALE", amount: Math.round((1360*0.25)/9*100)/100 },
  { nutrient_id: nutrientMap[4]!, age_group: "CHILD", gender: "FEMALE", amount: Math.round((1360/1000)*14*100)},
  { nutrient_id: nutrientMap["Calcium"]!, age_group: "CHILD", gender: "FEMALE", amount: 600.0 },
  { nutrient_id: nutrientMap["Iron"]!, age_group: "CHILD", gender: "FEMALE", amount: 10.0 },
  { nutrient_id: nutrientMap["VitaminC"]!, age_group: "CHILD", gender: "FEMALE", amount: 40.0 },

  // ADOLESCENT (13-15 y) - use gender-specific ICMR values
  // Male 13-15: kcal 2860,1RDA ~44.9g (ICMR table)
  { nutrient_id: nutrientMap["Calories"]!, age_group: "ADOLESCENT", gender: "MALE", amount: 2860.0 },
  { nutrient_id: nutrientMap["Protien"]!,  age_group: "ADOLESCENT", gender: "MALE", amount: 44.9 },
  { nutrient_id: nutrientMap[2]!, age_group: "ADOLESCENT", gender: "MALE", amount: Math.round((2860*0.55)/4*100)/100 }, // ~393.25
  { nutrient_id: nutrientMap[3]!, age_group: "ADOLESCENT", gender: "MALE", amount: Math.round((2860*0.25)/9*100)/100 }, // ~79.44
  { nutrient_id: nutrientMap[4]!, age_group: "ADOLESCENT", gender: "MALE", amount: Math.round((2860/1000)*14*100)/100 }, // ~40.04
  { nutrient_id: nutrientMap["Calcium"]!, age_group: "ADOLESCENT", gender: "MALE", amount: 1000.0 }, // ICMR adolescent Calcium often ~1000-1300; 1000 used conservatively
  { nutrient_id: nutrientMap["Iron"]!, age_group: "ADOLESCENT", gender: "MALE", amount: 11.0 }, // ICMR male teen ~11 mg
  { nutrient_id: nutrientMap["VitaminC"]!, age_group: "ADOLESCENT", gender: "MALE", amount: 80.0 },

  // ADOLESCENT female (13-15): kcal 2400,1~43.2 g (ICMR)
  { nutrient_id: nutrientMap["Calories"]!, age_group: "ADOLESCENT", gender: "FEMALE", amount: 2400.0 },
  { nutrient_id: nutrientMap["Protien"]!, age_group: "ADOLESCENT", gender: "FEMALE", amount: 43.2 },
  { nutrient_id: nutrientMap[2]!, age_group: "ADOLESCENT", gender: "FEMALE", amount: Math.round((2400*0.55)/4*100)/100 }, // ~330.00
  { nutrient_id: nutrientMap[3]!, age_group: "ADOLESCENT", gender: "FEMALE", amount: Math.round((2400*0.25)/9*100)/100 }, // ~66.67
  { nutrient_id: nutrientMap[4]!, age_group: "ADOLESCENT", gender: "FEMALE", amount: Math.round((2400/1000)*14*100)/100 }, // ~33.6
  { nutrient_id: nutrientMap["Calcium"]!, age_group: "ADOLESCENT", gender: "FEMALE", amount: 1000.0 },
  { nutrient_id: nutrientMap["Iron"]!, age_group: "ADOLESCENT", gender: "FEMALE", amount: 15.0 }, // girls need more Iron (ICMR teen female > adult female)
  { nutrient_id: nutrientMap["VitaminC"]!, age_group: "ADOLESCENT", gender: "FEMALE", amount: 65.0 },

  // ADULT (moderate work) - male: kcal 2710,154.0g (ICMR)
  { nutrient_id: nutrientMap["Calories"]!, age_group: "ADULT", gender: "MALE", amount: 2710.0 },
  { nutrient_id: nutrientMap["Protien"]!, age_group: "ADULT", gender: "MALE", amount: 54.0 },
  { nutrient_id: nutrientMap[2]!, age_group: "ADULT", gender: "MALE", amount: Math.round((2710*0.55)/4*100)/100 }, // ~372.63
  { nutrient_id: nutrientMap[3]!, age_group: "ADULT", gender: "MALE", amount: Math.round((2710*0.25)/9*100)/100 }, // ~75.28
  { nutrient_id: nutrientMap[4]!, age_group: "ADULT", gender: "MALE", amount: Math.round((2710/1000)*14*100)/100 }, // ~37.94
  { nutrient_id: nutrientMap["Calcium"]!, age_group: "ADULT", gender: "MALE", amount: 1000.0 }, // ICMR adult Calcium 1000 mg
  { nutrient_id: nutrientMap["Iron"]!, age_group: "ADULT", gender: "MALE", amount: 19.0 }, // ICMR adult male Iron 19 mg
  { nutrient_id: nutrientMap["VitaminC"]!, age_group: "ADULT", gender: "MALE", amount: 80.0 }, // ICMR male vitamin C 80 mg

  // ADULT female (moderate work) - kcal 2130,145.7g (ICMR)
  { nutrient_id: nutrientMap["Calories"]!, age_group: "ADULT", gender: "FEMALE", amount: 2130.0 },
  { nutrient_id: nutrientMap["Protien"]!, age_group: "ADULT", gender: "FEMALE", amount: 45.7 },
  { nutrient_id: nutrientMap[2]!, age_group: "ADULT", gender: "FEMALE", amount: Math.round((2130*0.55)/4*100)/100 }, // ~292.88
  { nutrient_id: nutrientMap[3]!, age_group: "ADULT", gender: "FEMALE", amount: Math.round((2130*0.25)/9*100)/100 }, // ~59.17
  { nutrient_id: nutrientMap[4]!, age_group: "ADULT", gender: "FEMALE", amount: Math.round((2130/1000)*14*100)/100 }, // ~29.82
  { nutrient_id: nutrientMap["Calcium"]!, age_group: "ADULT", gender: "FEMALE", amount: 1000.0 },
  { nutrient_id: nutrientMap["Iron"]!, age_group: "ADULT", gender: "FEMALE", amount: 29.0 }, // ICMR adult female Iron 29 mg
  { nutrient_id: nutrientMap["VitaminC"]!, age_group: "ADULT", gender: "FEMALE", amount: 65.0 }, // ICMR female vitamin C 65 mg

  // SENIOR (use Adult sedentary baseline) - male sedentary 2110 kcal (ICMR)
  { nutrient_id: nutrientMap["Calories"]!, age_group: "SENIOR", gender: "MALE", amount: 2110.0 },
  { nutrient_id: nutrientMap["Protien"]!,  age_group: "SENIOR", gender: "MALE", amount: 54.0 }, // keep adult1requirement same (g/day) unless geriatrics adjustments required
  { nutrient_id: nutrientMap[2]!, age_group: "SENIOR", gender: "MALE", amount: Math.round((2110*0.55)/4*100)/100 },
  { nutrient_id: nutrientMap[3]!, age_group: "SENIOR", gender: "MALE", amount: Math.round((2110*0.25)/9*100)/100 },
  { nutrient_id: nutrientMap[4]!, age_group: "SENIOR", gender: "MALE", amount: Math.round((2110/1000)*14*100)},
  { nutrient_id: nutrientMap["Calcium"]!, age_group: "SENIOR", gender: "MALE", amount: 1000.0 },
  { nutrient_id: nutrientMap["Iron"]!, age_group: "SENIOR", gender: "MALE", amount: 19.0 },
  { nutrient_id: nutrientMap["VitaminC"]!, age_group: "SENIOR", gender: "MALE", amount: 80.0 },

  // SENIOR female (sedentary baseline) - 1660 kcal
  { nutrient_id: nutrientMap["Calories"]!, age_group: "SENIOR", gender: "FEMALE", amount: 1660.0 },
  { nutrient_id: nutrientMap["Protien"]!,  age_group: "SENIOR", gender: "FEMALE", amount: 45.7 },
  { nutrient_id: nutrientMap[2]!, age_group: "SENIOR", gender: "FEMALE", amount: Math.round((1660*0.55)/4*100)/100 },
  { nutrient_id: nutrientMap[3]!, age_group: "SENIOR", gender: "FEMALE", amount: Math.round((1660*0.25)/9*100)/100 },
  { nutrient_id: nutrientMap[4]!, age_group: "SENIOR", gender: "FEMALE", amount: Math.round((1660/1000)*14*100)},
  { nutrient_id: nutrientMap["Calcium"]!, age_group: "SENIOR", gender: "FEMALE", amount: 1000.0 },
  { nutrient_id: nutrientMap["Iron"]!, age_group: "SENIOR", gender: "FEMALE", amount: 29.0 },
  { nutrient_id: nutrientMap["VitaminC"]!, age_group: "SENIOR", gender: "FEMALE", amount: 65.0 },
];


  const data = seedRda.map((r) => ({
    nutrient_id: r.nutrient_id!,
    age_group: r.age_group!,
    gender: r.gender!,
    amount: r.amount!,
  }));

  await prisma.rda.deleteMany();
  console.log("Seeding RDA data...");
  
  await prisma.rda.createMany({ data, skipDuplicates: true });
  console.log("RDA seed complete");
}

main().catch((e) => { console.error(e); process.exit(); }).finally(() => prisma.$disconnect());
