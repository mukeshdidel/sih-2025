import { prisma } from ".";

async function main() {
  const nutrients = await prisma.nutrient.findMany();
  const nutrientMap: Record<string, string> = Object.fromEntries(
    nutrients.map((n) => [n.name, n.nutrient_id])
  );

  const rasas = await prisma.rasa.findMany();
  const rasaMap: Record<string, string> = Object.fromEntries(
    rasas.map((r) => [r.name, r.rasa_id])
  );

  const gunas = await prisma.guna.findMany();
  const gunaMap: Record<string, string> = Object.fromEntries(
    gunas.map((g) => [g.name, g.guna_id])
  );

  const doshas = await prisma.dosha.findMany();
  const doshaMap: Record<string, string> = Object.fromEntries(
    doshas.map((d) => [d.name, d.dosha_id])
  );

  const viryas = await prisma.virya.findMany();
  const viryaMap: Record<string, string> = Object.fromEntries(
    viryas.map((v) => [v.name, v.virya_id])
  );

  const vipakas = await prisma.vipaka.findMany();
  const vipakaMap: Record<string, string> = Object.fromEntries(
    vipakas.map((v) => [v.name, v.vipaka_id])
  );

  const digestibilities = await prisma.digestibility.findMany();
  const digestMap: Record<string, string> = Object.fromEntries(
    digestibilities.map((d) => [d.name, d.digestibility_id])
  );

  // ✅ Helper function
  async function createFood(
    name: string,
    hindi: string,
    nutrients: { key: string; amount: number }[],
    rasa: string,
    guna: string,
    dosha: string,
    virya: string,
    vipaka: string,
    digest: string
  ) {
    return prisma.food.create({
      data: {
        name,
        hindi_name: hindi,
        FoodNutrient: {
          create: nutrients.map((n) => ({
            amount: n.amount,
            nutrient: { connect: { nutrient_id: nutrientMap[n.key] } }, // ✅ fixed
          })),
        },
        FoodRasa: {
          create: [{ rasa: { connect: { rasa_id: rasaMap[rasa] } } }],
        },
        FoodGuna: {
          create: [{ guna: { connect: { guna_id: gunaMap[guna] } } }],
        },
        FoodDosha: {
          create: [{ dosha: { connect: { dosha_id: doshaMap[dosha] } } }],
        },
        FoodVirya: {
          create: [{ virya: { connect: { virya_id: viryaMap[virya] } } }],
        },
        FoodVipaka: {
          create: [{ vipaka: { connect: { vipaka_id: vipakaMap[vipaka] } } }],
        },
        FoodDigestibility: {
          create: [
            { digestibility: { connect: { digestibility_id: digestMap[digest] } } },
          ],
        },
      },
    });
  }

  prisma.food.deleteMany();

  console.log("foods deleted.");

// ---------- Batch 1: 1-10 Foods ----------
await createFood("Rice", "Chawal", [
  { key: "Calories", amount: 130 },
  { key: "Protein", amount: 2.7 },
  { key: "Carbohydrate", amount: 28 },
  { key: "Fat", amount: 0.3 },
  { key: "Fiber", amount: 0.4 },
  { key: "Calcium", amount: 10 },
  { key: "Iron", amount: 1.2 },
  { key: "Vitamin C", amount: 0 },
], "Madhura", "Laghu", "Pitta", "Shita", "Madhura", "Easy");

await createFood("Wheat", "Gehu", [
  { key: "Calories", amount: 340 },
  { key: "Protein", amount: 13.2 },
  { key: "Carbohydrate", amount: 72 },
  { key: "Fat", amount: 2.5 },
  { key: "Fiber", amount: 12.2 },
  { key: "Calcium", amount: 34 },
  { key: "Iron", amount: 3.6 },
  { key: "Vitamin C", amount: 0 },
], "Madhura", "Guru", "Vata", "Shita", "Madhura", "Medium");

await createFood("Potato", "Aloo", [
  { key: "Calories", amount: 87 },
  { key: "Protein", amount: 2 },
  { key: "Carbohydrate", amount: 20 },
  { key: "Fat", amount: 0.1 },
  { key: "Fiber", amount: 2.2 },
  { key: "Calcium", amount: 11 },
  { key: "Iron", amount: 0.8 },
  { key: "Vitamin C", amount: 20 },
], "Madhura", "Guru", "Vata", "Shita", "Madhura", "Medium");

await createFood("Spinach", "Palak", [
  { key: "Calories", amount: 23 },
  { key: "Protein", amount: 2.9 },
  { key: "Carbohydrate", amount: 3.6 },
  { key: "Fat", amount: 0.4 },
  { key: "Fiber", amount: 2.2 },
  { key: "Calcium", amount: 99 },
  { key: "Iron", amount: 2.7 },
  { key: "Vitamin C", amount: 28 },
], "Tikta", "Laghu", "Pitta", "Shita", "Madhura", "Easy");

await createFood("Tomato", "Tamatar", [
  { key: "Calories", amount: 18 },
  { key: "Protein", amount: 0.9 },
  { key: "Carbohydrate", amount: 3.9 },
  { key: "Fat", amount: 0.2 },
  { key: "Fiber", amount: 1.2 },
  { key: "Calcium", amount: 10 },
  { key: "Iron", amount: 0.3 },
  { key: "Vitamin C", amount: 14 },
], "Amla", "Laghu", "Kapha", "Ushna", "Amla", "Easy");

await createFood("Onion", "Pyaaz", [
  { key: "Calories", amount: 40 },
  { key: "Protein", amount: 1.1 },
  { key: "Carbohydrate", amount: 9 },
  { key: "Fat", amount: 0.1 },
  { key: "Fiber", amount: 1.7 },
  { key: "Calcium", amount: 23 },
  { key: "Iron", amount: 0.2 },
  { key: "Vitamin C", amount: 7 },
], "Katu", "Ruksha", "Vata", "Ushna", "Katu", "Easy");

await createFood("Carrot", "Gajar", [
  { key: "Calories", amount: 41 },
  { key: "Protein", amount: 0.9 },
  { key: "Carbohydrate", amount: 9.6 },
  { key: "Fat", amount: 0.2 },
  { key: "Fiber", amount: 2.8 },
  { key: "Calcium", amount: 33 },
  { key: "Iron", amount: 0.3 },
  { key: "Vitamin C", amount: 7 },
], "Madhura", "Laghu", "Vata", "Shita", "Madhura", "Easy");

await createFood("Cauliflower", "Phool Gobhi", [
  { key: "Calories", amount: 25 },
  { key: "Protein", amount: 1.9 },
  { key: "Carbohydrate", amount: 5 },
  { key: "Fat", amount: 0.3 },
  { key: "Fiber", amount: 2 },
  { key: "Calcium", amount: 22 },
  { key: "Iron", amount: 0.4 },
  { key: "Vitamin C", amount: 48 },
], "Katu", "Laghu", "Kapha", "Shita", "Madhura", "Easy");

await createFood("Cabbage", "Patta Gobhi", [
  { key: "Calories", amount: 25 },
  { key: "Protein", amount: 1.3 },
  { key: "Carbohydrate", amount: 5.8 },
  { key: "Fat", amount: 0.1 },
  { key: "Fiber", amount: 2.5 },
  { key: "Calcium", amount: 40 },
  { key: "Iron", amount: 0.5 },
  { key: "Vitamin C", amount: 36 },
], "Katu", "Laghu", "Kapha", "Shita", "Madhura", "Easy");


console.log("Batch 1 foods created.");

// ---------- Batch 2: 11-20 Foods ----------
await createFood("Lentils", "Masoor Dal", [
  { key: "Calories", amount: 116 },
  { key: "Protein", amount: 9 },
  { key: "Carbohydrate", amount: 20 },
  { key: "Fat", amount: 0.4 },
  { key: "Fiber", amount: 8 },
  { key: "Calcium", amount: 19 },
  { key: "Iron", amount: 3.3 },
  { key: "Vitamin C", amount: 1.5 },
], "Madhura", "Laghu", "Kapha", "Ushna", "Madhura", "Medium");

await createFood("Kidney Beans", "Rajma", [
  { key: "Calories", amount: 127 },
  { key: "Protein", amount: 8.7 },
  { key: "Carbohydrate", amount: 22 },
  { key: "Fat", amount: 0.5 },
  { key: "Fiber", amount: 6.4 },
  { key: "Calcium", amount: 28 },
  { key: "Iron", amount: 2.9 },
  { key: "Vitamin C", amount: 0 },
], "Kashaya", "Guru", "Vata", "Ushna", "Katu", "Medium");

await createFood("Green Gram", "Moong Dal", [
  { key: "Calories", amount: 105 },
  { key: "Protein", amount: 7 },
  { key: "Carbohydrate", amount: 19 },
  { key: "Fat", amount: 0.4 },
  { key: "Fiber", amount: 7.6 },
  { key: "Calcium", amount: 27 },
  { key: "Iron", amount: 1.4 },
  { key: "Vitamin C", amount: 1.5 },
], "Madhura", "Laghu", "Pitta", "Shita", "Madhura", "Easy");

await createFood("Chickpeas", "Chana", [
  { key: "Calories", amount: 164 },
  { key: "Protein", amount: 8.9 },
  { key: "Carbohydrate", amount: 27 },
  { key: "Fat", amount: 2.6 },
  { key: "Fiber", amount: 7.6 },
  { key: "Calcium", amount: 49 },
  { key: "Iron", amount: 2.9 },
  { key: "Vitamin C", amount: 4 },
], "Madhura", "Guru", "Kapha", "Ushna", "Madhura", "Medium");

await createFood("Peas", "Matar", [
  { key: "Calories", amount: 81 },
  { key: "Protein", amount: 5.4 },
  { key: "Carbohydrate", amount: 14.5 },
  { key: "Fat", amount: 0.4 },
  { key: "Fiber", amount: 5.1 },
  { key: "Calcium", amount: 25 },
  { key: "Iron", amount: 1.5 },
  { key: "Vitamin C", amount: 40 },
], "Madhura", "Laghu", "Kapha", "Shita", "Madhura", "Easy");

await createFood("Radish", "Mooli", [
  { key: "Calories", amount: 16 },
  { key: "Protein", amount: 0.7 },
  { key: "Carbohydrate", amount: 3.4 },
  { key: "Fat", amount: 0.1 },
  { key: "Fiber", amount: 1.6 },
  { key: "Calcium", amount: 25 },
  { key: "Iron", amount: 0.3 },
  { key: "Vitamin C", amount: 14.8 },
], "Katu", "Laghu", "Kapha", "Ushna", "Katu", "Easy");

await createFood("Bitter Gourd", "Karela", [
  { key: "Calories", amount: 17 },
  { key: "Protein", amount: 1 },
  { key: "Carbohydrate", amount: 3.7 },
  { key: "Fat", amount: 0.2 },
  { key: "Fiber", amount: 2.8 },
  { key: "Calcium", amount: 19 },
  { key: "Iron", amount: 0.4 },
  { key: "Vitamin C", amount: 84 },
], "Tikta", "Laghu", "Kapha", "Ushna", "Katu", "Easy");

await createFood("Bottle Gourd", "Lauki", [
  { key: "Calories", amount: 14 },
  { key: "Protein", amount: 0.6 },
  { key: "Carbohydrate", amount: 3.4 },
  { key: "Fat", amount: 0.1 },
  { key: "Fiber", amount: 0.5 },
  { key: "Calcium", amount: 26 },
  { key: "Iron", amount: 0.2 },
  { key: "Vitamin C", amount: 10 },
], "Madhura", "Laghu", "Pitta", "Shita", "Madhura", "Easy");

await createFood("Pumpkin", "Kaddu", [
  { key: "Calories", amount: 26 },
  { key: "Protein", amount: 1 },
  { key: "Carbohydrate", amount: 6.5 },
  { key: "Fat", amount: 0.1 },
  { key: "Fiber", amount: 0.5 },
  { key: "Calcium", amount: 21 },
  { key: "Iron", amount: 0.8 },
  { key: "Vitamin C", amount: 9 },
], "Madhura", "Laghu", "Pitta", "Shita", "Madhura", "Easy");

await createFood("Lady Finger", "Bhindi", [
  { key: "Calories", amount: 33 },
  { key: "Protein", amount: 1.9 },
  { key: "Carbohydrate", amount: 7.5 },
  { key: "Fat", amount: 0.2 },
  { key: "Fiber", amount: 3.2 },
  { key: "Calcium", amount: 82 },
  { key: "Iron", amount: 0.6 },
  { key: "Vitamin C", amount: 23 },
], "Madhura", "Laghu", "Kapha", "Shita", "Madhura", "Easy");

console.log("Batch 2 foods created.");

// ---------- Batch 3: 21-30 Foods ----------
await createFood("Turnip", "Shalgam", [
  { key: "Calories", amount: 28 },
  { key: "Protein", amount: 0.9 },
  { key: "Carbohydrate", amount: 6.4 },
  { key: "Fat", amount: 0.1 },
  { key: "Fiber", amount: 1.8 },
  { key: "Calcium", amount: 30 },
  { key: "Iron", amount: 0.3 },
  { key: "Vitamin C", amount: 21 },
], "Katu", "Laghu", "Kapha", "Ushna", "Katu", "Easy");


await createFood("Cucumber", "Kheera", [
  { key: "Calories", amount: 16 },
  { key: "Protein", amount: 0.7 },
  { key: "Carbohydrate", amount: 3.6 },
  { key: "Fat", amount: 0.1 },
  { key: "Fiber", amount: 0.5 },
  { key: "Calcium", amount: 16 },
  { key: "Iron", amount: 0.3 },
  { key: "Vitamin C", amount: 3.2 },
], "Madhura", "Laghu", "Pitta", "Shita", "Madhura", "Easy");

await createFood("Coriander Leaves", "Dhaniya Patta", [
  { key: "Calories", amount: 23 },
  { key: "Protein", amount: 2.1 },
  { key: "Carbohydrate", amount: 3.7 },
  { key: "Fat", amount: 0.5 },
  { key: "Fiber", amount: 3.3 },
  { key: "Calcium", amount: 67 },
  { key: "Iron", amount: 1.8 },
  { key: "Vitamin C", amount: 27 },
], "Tikta", "Laghu", "Kapha", "Shita", "Katu", "Easy");

await createFood("Mint Leaves", "Pudina", [
  { key: "Calories", amount: 44 },
  { key: "Protein", amount: 3.3 },
  { key: "Carbohydrate", amount: 8 },
  { key: "Fat", amount: 0.7 },
  { key: "Fiber", amount: 6.8 },
  { key: "Calcium", amount: 199 },
  { key: "Iron", amount: 15.6 },
  { key: "Vitamin C", amount: 31.8 },
], "Tikta", "Laghu", "Pitta", "Shita", "Katu", "Easy");

await createFood("Drumstick", "Sahjan", [
  { key: "Calories", amount: 37 },
  { key: "Protein", amount: 2.1 },
  { key: "Carbohydrate", amount: 8.5 },
  { key: "Fat", amount: 0.2 },
  { key: "Fiber", amount: 3.2 },
  { key: "Calcium", amount: 30 },
  { key: "Iron", amount: 0.4 },
  { key: "Vitamin C", amount: 141 },
], "Katu", "Laghu", "Kapha", "Ushna", "Katu", "Easy");

await createFood("Ridge Gourd", "Turai", [
  { key: "Calories", amount: 20 },
  { key: "Protein", amount: 1.2 },
  { key: "Carbohydrate", amount: 4.4 },
  { key: "Fat", amount: 0.2 },
  { key: "Fiber", amount: 2 },
  { key: "Calcium", amount: 18 },
  { key: "Iron", amount: 0.4 },
  { key: "Vitamin C", amount: 12 },
], "Madhura", "Laghu", "Pitta", "Shita", "Madhura", "Easy");

await createFood("Snake Gourd", "Chichinda", [
  { key: "Calories", amount: 18 },
  { key: "Protein", amount: 0.6 },
  { key: "Carbohydrate", amount: 4 },
  { key: "Fat", amount: 0.1 },
  { key: "Fiber", amount: 1.1 },
  { key: "Calcium", amount: 26 },
  { key: "Iron", amount: 0.3 },
  { key: "Vitamin C", amount: 6 },
], "Madhura", "Laghu", "Pitta", "Shita", "Madhura", "Easy");

await createFood("Pointed Gourd", "Parwal", [
  { key: "Calories", amount: 20 },
  { key: "Protein", amount: 1.2 },
  { key: "Carbohydrate", amount: 4.3 },
  { key: "Fat", amount: 0.2 },
  { key: "Fiber", amount: 2.6 },
  { key: "Calcium", amount: 30 },
  { key: "Iron", amount: 0.4 },
  { key: "Vitamin C", amount: 18 },
], "Madhura", "Laghu", "Kapha", "Shita", "Madhura", "Easy");

await createFood("Raw Mango", "Kaccha Aam", [
  { key: "Calories", amount: 60 },
  { key: "Protein", amount: 0.8 },
  { key: "Carbohydrate", amount: 15 },
  { key: "Fat", amount: 0.4 },
  { key: "Fiber", amount: 1.6 },
  { key: "Calcium", amount: 10 },
  { key: "Iron", amount: 0.2 },
  { key: "Vitamin C", amount: 36 },
], "Amla", "Laghu", "Pitta", "Ushna", "Amla", "Easy");

console.log("Batch 3 foods created.");

// ---------- Batch 4: 31-40 Foods ----------
await createFood("Ripe Mango", "Pakka Aam", [
  { key: "Calories", amount: 60 },
  { key: "Protein", amount: 0.8 },
  { key: "Carbohydrate", amount: 15 },
  { key: "Fat", amount: 0.4 },
  { key: "Fiber", amount: 1.6 },
  { key: "Calcium", amount: 11 },
  { key: "Iron", amount: 0.2 },
  { key: "Vitamin C", amount: 36 },
], "Madhura", "Guru", "Pitta", "Ushna", "Madhura", "Medium");

await createFood("Banana", "Kela", [
  { key: "Calories", amount: 89 },
  { key: "Protein", amount: 1.1 },
  { key: "Carbohydrate", amount: 23 },
  { key: "Fat", amount: 0.3 },
  { key: "Fiber", amount: 2.6 },
  { key: "Calcium", amount: 5 },
  { key: "Iron", amount: 0.3 },
  { key: "Vitamin C", amount: 8.7 },
], "Madhura", "Guru", "Kapha", "Shita", "Madhura", "Medium");

await createFood("Apple", "Seb", [
  { key: "Calories", amount: 52 },
  { key: "Protein", amount: 0.3 },
  { key: "Carbohydrate", amount: 14 },
  { key: "Fat", amount: 0.2 },
  { key: "Fiber", amount: 2.4 },
  { key: "Calcium", amount: 6 },
  { key: "Iron", amount: 0.1 },
  { key: "Vitamin C", amount: 4.6 },
], "Madhura", "Laghu", "Vata", "Shita", "Madhura", "Easy");

await createFood("Guava", "Amrood", [
  { key: "Calories", amount: 68 },
  { key: "Protein", amount: 2.6 },
  { key: "Carbohydrate", amount: 14 },
  { key: "Fat", amount: 1 },
  { key: "Fiber", amount: 5.4 },
  { key: "Calcium", amount: 18 },
  { key: "Iron", amount: 0.3 },
  { key: "Vitamin C", amount: 228 },
], "Madhura", "Laghu", "Kapha", "Shita", "Madhura", "Easy");

await createFood("Papaya", "Papita", [
  { key: "Calories", amount: 43 },
  { key: "Protein", amount: 0.5 },
  { key: "Carbohydrate", amount: 11 },
  { key: "Fat", amount: 0.3 },
  { key: "Fiber", amount: 1.7 },
  { key: "Calcium", amount: 20 },
  { key: "Iron", amount: 0.3 },
  { key: "Vitamin C", amount: 60.9 },
], "Madhura", "Laghu", "Pitta", "Shita", "Madhura", "Easy");

await createFood("Pineapple", "Ananas", [
  { key: "Calories", amount: 50 },
  { key: "Protein", amount: 0.5 },
  { key: "Carbohydrate", amount: 13 },
  { key: "Fat", amount: 0.1 },
  { key: "Fiber", amount: 1.4 },
  { key: "Calcium", amount: 13 },
  { key: "Iron", amount: 0.3 },
  { key: "Vitamin C", amount: 47.8 },
], "Amla", "Laghu", "Pitta", "Ushna", "Amla", "Easy");

await createFood("Orange", "Santra", [
  { key: "Calories", amount: 47 },
  { key: "Protein", amount: 0.9 },
  { key: "Carbohydrate", amount: 12 },
  { key: "Fat", amount: 0.1 },
  { key: "Fiber", amount: 2.4 },
  { key: "Calcium", amount: 40 },
  { key: "Iron", amount: 0.1 },
  { key: "Vitamin C", amount: 53.2 },
], "Amla", "Laghu", "Kapha", "Shita", "Amla", "Easy");

await createFood("Watermelon", "Tarbooj", [
  { key: "Calories", amount: 30 },
  { key: "Protein", amount: 0.6 },
  { key: "Carbohydrate", amount: 8 },
  { key: "Fat", amount: 0.2 },
  { key: "Fiber", amount: 0.4 },
  { key: "Calcium", amount: 7 },
  { key: "Iron", amount: 0.2 },
  { key: "Vitamin C", amount: 8.1 },
], "Madhura", "Laghu", "Pitta", "Shita", "Madhura", "Easy");

await createFood("Pomegranate", "Anar", [
  { key: "Calories", amount: 83 },
  { key: "Protein", amount: 1.7 },
  { key: "Carbohydrate", amount: 19 },
  { key: "Fat", amount: 1.2 },
  { key: "Fiber", amount: 4 },
  { key: "Calcium", amount: 10 },
  { key: "Iron", amount: 0.3 },
  { key: "Vitamin C", amount: 10.2 },
], "Madhura", "Laghu", "Vata", "Shita", "Madhura", "Easy");

await createFood("Grapes", "Angoor", [
  { key: "Calories", amount: 69 },
  { key: "Protein", amount: 0.7 },
  { key: "Carbohydrate", amount: 18 },
  { key: "Fat", amount: 0.2 },
  { key: "Fiber", amount: 0.9 },
  { key: "Calcium", amount: 10 },
  { key: "Iron", amount: 0.3 },
  { key: "Vitamin C", amount: 10.8 },
], "Madhura", "Guru", "Pitta", "Shita", "Madhura", "Medium");

console.log("Batch 4 foods created.");

// ---------- Batch 5: 41-50 Foods ----------
await createFood("Strawberry", "Strawberry", [
  { key: "Calories", amount: 32 },
  { key: "Protein", amount: 0.7 },
  { key: "Carbohydrate", amount: 7.7 },
  { key: "Fat", amount: 0.3 },
  { key: "Fiber", amount: 2 },
  { key: "Calcium", amount: 16 },
  { key: "Iron", amount: 0.4 },
  { key: "Vitamin C", amount: 58.8 },
], "Amla", "Laghu", "Pitta", "Shita", "Amla", "Easy");

await createFood("Blueberry", "Blueberry", [
  { key: "Calories", amount: 57 },
  { key: "Protein", amount: 0.7 },
  { key: "Carbohydrate", amount: 14 },
  { key: "Fat", amount: 0.3 },
  { key: "Fiber", amount: 2.4 },
  { key: "Calcium", amount: 6 },
  { key: "Iron", amount: 0.3 },
  { key: "Vitamin C", amount: 9.7 },
], "Madhura", "Laghu", "Pitta", "Shita", "Madhura", "Easy");

await createFood("Blackberry", "Blackberry", [
  { key: "Calories", amount: 43 },
  { key: "Protein", amount: 1.4 },
  { key: "Carbohydrate", amount: 10 },
  { key: "Fat", amount: 0.5 },
  { key: "Fiber", amount: 5.3 },
  { key: "Calcium", amount: 29 },
  { key: "Iron", amount: 0.6 },
  { key: "Vitamin C", amount: 21 },
], "Madhura", "Laghu", "Kapha", "Shita", "Madhura", "Easy");

await createFood("Raspberry", "Raspberry", [
  { key: "Calories", amount: 52 },
  { key: "Protein", amount: 1.2 },
  { key: "Carbohydrate", amount: 12 },
  { key: "Fat", amount: 0.7 },
  { key: "Fiber", amount: 6.5 },
  { key: "Calcium", amount: 25 },
  { key: "Iron", amount: 0.7 },
  { key: "Vitamin C", amount: 26.2 },
], "Madhura", "Laghu", "Kapha", "Shita", "Madhura", "Easy");

await createFood("Dates", "Khajoor", [
  { key: "Calories", amount: 282 },
  { key: "Protein", amount: 2.5 },
  { key: "Carbohydrate", amount: 75 },
  { key: "Fat", amount: 0.4 },
  { key: "Fiber", amount: 8 },
  { key: "Calcium", amount: 39 },
  { key: "Iron", amount: 1 },
  { key: "Vitamin C", amount: 0 },
], "Madhura", "Guru", "Vata", "Ushna", "Madhura", "Medium");

await createFood("Fig", "Anjeer", [
  { key: "Calories", amount: 74 },
  { key: "Protein", amount: 0.8 },
  { key: "Carbohydrate", amount: 19 },
  { key: "Fat", amount: 0.3 },
  { key: "Fiber", amount: 2.9 },
  { key: "Calcium", amount: 35 },
  { key: "Iron", amount: 0.4 },
  { key: "Vitamin C", amount: 2 },
], "Madhura", "Guru", "Kapha", "Shita", "Madhura", "Medium");

await createFood("Jackfruit", "Kathal", [
  { key: "Calories", amount: 95 },
  { key: "Protein", amount: 1.7 },
  { key: "Carbohydrate", amount: 23 },
  { key: "Fat", amount: 0.6 },
  { key: "Fiber", amount: 1.5 },
  { key: "Calcium", amount: 24 },
  { key: "Iron", amount: 0.2 },
  { key: "Vitamin C", amount: 13.7 },
], "Madhura", "Guru", "Kapha", "Ushna", "Madhura", "Medium");

await createFood("Sapota", "Chikoo", [
  { key: "Calories", amount: 83 },
  { key: "Protein", amount: 0.4 },
  { key: "Carbohydrate", amount: 20 },
  { key: "Fat", amount: 1.1 },
  { key: "Fiber", amount: 5.3 },
  { key: "Calcium", amount: 21 },
  { key: "Iron", amount: 0.8 },
  { key: "Vitamin C", amount: 14.7 },
], "Madhura", "Guru", "Kapha", "Shita", "Madhura", "Medium");

await createFood("Pear", "Nashpati", [
  { key: "Calories", amount: 57 },
  { key: "Protein", amount: 0.4 },
  { key: "Carbohydrate", amount: 15 },
  { key: "Fat", amount: 0.1 },
  { key: "Fiber", amount: 3.1 },
  { key: "Calcium", amount: 9 },
  { key: "Iron", amount: 0.2 },
  { key: "Vitamin C", amount: 4.3 },
], "Madhura", "Laghu", "Kapha", "Shita", "Madhura", "Easy");

await createFood("Lychee", "Litchi", [
  { key: "Calories", amount: 66 },
  { key: "Protein", amount: 0.8 },
  { key: "Carbohydrate", amount: 17 },
  { key: "Fat", amount: 0.4 },
  { key: "Fiber", amount: 1.3 },
  { key: "Calcium", amount: 5 },
  { key: "Iron", amount: 0.3 },
  { key: "Vitamin C", amount: 71.5 },
], "Madhura", "Laghu", "Pitta", "Shita", "Madhura", "Easy");

console.log("Batch 5 foods created.");

// ---------- Batch 6: 51-60 Foods ----------
await createFood("Sweet Potato", "Shakarkand", [
  { key: "Calories", amount: 86 },
  { key: "Protein", amount: 1.6 },
  { key: "Carbohydrate", amount: 20 },
  { key: "Fat", amount: 0.1 },
  { key: "Fiber", amount: 3 },
  { key: "Calcium", amount: 30 },
  { key: "Iron", amount: 0.6 },
  { key: "Vitamin C", amount: 2.4 },
], "Madhura", "Guru", "Kapha", "Ushna", "Madhura", "Medium");

await createFood("Beetroot", "Chukandar", [
  { key: "Calories", amount: 43 },
  { key: "Protein", amount: 1.6 },
  { key: "Carbohydrate", amount: 10 },
  { key: "Fat", amount: 0.2 },
  { key: "Fiber", amount: 2.8 },
  { key: "Calcium", amount: 16 },
  { key: "Iron", amount: 0.8 },
  { key: "Vitamin C", amount: 4.9 },
], "Madhura", "Laghu", "Kapha", "Shita", "Madhura", "Easy");


await createFood("French Beans", "Farasbi", [
  { key: "Calories", amount: 31 },
  { key: "Protein", amount: 1.8 },
  { key: "Carbohydrate", amount: 7 },
  { key: "Fat", amount: 0.1 },
  { key: "Fiber", amount: 3.4 },
  { key: "Calcium", amount: 37 },
  { key: "Iron", amount: 1 },
  { key: "Vitamin C", amount: 12 },
], "Katu", "Laghu", "Kapha", "Shita", "Katu", "Easy");

console.log("Batch 6 foods created.");

// ---------- Batch 7: 61-70 Foods ----------
await createFood("Cluster Beans", "Gawar Phali", [
  { key: "Calories", amount: 30 },
  { key: "Protein", amount: 3.2 },
  { key: "Carbohydrate", amount: 10.8 },
  { key: "Fat", amount: 0.4 },
  { key: "Fiber", amount: 3 },
  { key: "Calcium", amount: 49 },
  { key: "Iron", amount: 4.5 },
  { key: "Vitamin C", amount: 49 },
], "Katu", "Laghu", "Vata", "Shita", "Katu", "Easy");


await createFood("Ash Gourd", "Petha", [
  { key: "Calories", amount: 13 },
  { key: "Protein", amount: 0.4 },
  { key: "Carbohydrate", amount: 3 },
  { key: "Fat", amount: 0.2 },
  { key: "Fiber", amount: 0.6 },
  { key: "Calcium", amount: 30 },
  { key: "Iron", amount: 0.4 },
  { key: "Vitamin C", amount: 13 },
], "Madhura", "Laghu", "Pitta", "Shita", "Madhura", "Easy");



await createFood("Zucchini", "Zucchini", [
  { key: "Calories", amount: 17 },
  { key: "Protein", amount: 1.2 },
  { key: "Carbohydrate", amount: 3.1 },
  { key: "Fat", amount: 0.3 },
  { key: "Fiber", amount: 1 },
  { key: "Calcium", amount: 16 },
  { key: "Iron", amount: 0.4 },
  { key: "Vitamin C", amount: 17.9 },
], "Madhura", "Laghu", "Kapha", "Shita", "Madhura", "Easy");

await createFood("Capsicum", "Shimla Mirch", [
  { key: "Calories", amount: 20 },
  { key: "Protein", amount: 0.9 },
  { key: "Carbohydrate", amount: 4.6 },
  { key: "Fat", amount: 0.2 },
  { key: "Fiber", amount: 1.7 },
  { key: "Calcium", amount: 10 },
  { key: "Iron", amount: 0.3 },
  { key: "Vitamin C", amount: 80.4 },
], "Katu", "Laghu", "Pitta", "Ushna", "Katu", "Easy");



console.log("Batch 7 foods created.");

// ---------- Batch 8: 71-80 Foods ----------
await createFood("Corn", "Makka", [
  { key: "Calories", amount: 86 },
  { key: "Protein", amount: 3.2 },
  { key: "Carbohydrate", amount: 19 },
  { key: "Fat", amount: 1.2 },
  { key: "Fiber", amount: 2.7 },
  { key: "Calcium", amount: 2 },
  { key: "Iron", amount: 0.5 },
  { key: "Vitamin C", amount: 6.8 },
], "Madhura", "Guru", "Kapha", "Ushna", "Madhura", "Medium");

await createFood("Barley", "Jau", [
  { key: "Calories", amount: 354 },
  { key: "Protein", amount: 12.5 },
  { key: "Carbohydrate", amount: 73 },
  { key: "Fat", amount: 2.3 },
  { key: "Fiber", amount: 17 },
  { key: "Calcium", amount: 33 },
  { key: "Iron", amount: 3.6 },
  { key: "Vitamin C", amount: 0 },
], "Madhura", "Guru", "Kapha", "Shita", "Madhura", "Medium");

await createFood("Millet", "Bajra", [
  { key: "Calories", amount: 378 },
  { key: "Protein", amount: 11 },
  { key: "Carbohydrate", amount: 73 },
  { key: "Fat", amount: 4.2 },
  { key: "Fiber", amount: 8.5 },
  { key: "Calcium", amount: 42 },
  { key: "Iron", amount: 8 },
  { key: "Vitamin C", amount: 0 },
], "Madhura", "Guru", "Kapha", "Shita", "Madhura", "Medium");

await createFood("Sorghum", "Jowar", [
  { key: "Calories", amount: 329 },
  { key: "Protein", amount: 10.6 },
  { key: "Carbohydrate", amount: 72 },
  { key: "Fat", amount: 3.5 },
  { key: "Fiber", amount: 6.7 },
  { key: "Calcium", amount: 25 },
  { key: "Iron", amount: 4.1 },
  { key: "Vitamin C", amount: 0 },
], "Madhura", "Guru", "Kapha", "Shita", "Madhura", "Medium");

await createFood("Oats", "Jai", [
  { key: "Calories", amount: 389 },
  { key: "Protein", amount: 16.9 },
  { key: "Carbohydrate", amount: 66 },
  { key: "Fat", amount: 6.9 },
  { key: "Fiber", amount: 10.6 },
  { key: "Calcium", amount: 54 },
  { key: "Iron", amount: 4.7 },
  { key: "Vitamin C", amount: 0 },
], "Madhura", "Guru", "Kapha", "Shita", "Madhura", "Medium");

await createFood("Quinoa", "Quinoa", [
  { key: "Calories", amount: 368 },
  { key: "Protein", amount: 14.1 },
  { key: "Carbohydrate", amount: 64 },
  { key: "Fat", amount: 6.1 },
  { key: "Fiber", amount: 7 },
  { key: "Calcium", amount: 47 },
  { key: "Iron", amount: 4.6 },
  { key: "Vitamin C", amount: 0 },
], "Madhura", "Guru", "Kapha", "Shita", "Madhura", "Medium");

await createFood("Amaranth Seeds", "Rajgira", [
  { key: "Calories", amount: 371 },
  { key: "Protein", amount: 13.6 },
  { key: "Carbohydrate", amount: 65 },
  { key: "Fat", amount: 7 },
  { key: "Fiber", amount: 6.7 },
  { key: "Calcium", amount: 159 },
  { key: "Iron", amount: 7.6 },
  { key: "Vitamin C", amount: 4.2 },
], "Madhura", "Guru", "Kapha", "Shita", "Madhura", "Medium");

await createFood("Buckwheat", "Kuttu", [
  { key: "Calories", amount: 343 },
  { key: "Protein", amount: 13.3 },
  { key: "Carbohydrate", amount: 71.5 },
  { key: "Fat", amount: 3.4 },
  { key: "Fiber", amount: 10 },
  { key: "Calcium", amount: 18 },
  { key: "Iron", amount: 2.2 },
  { key: "Vitamin C", amount: 0 },
], "Madhura", "Guru", "Kapha", "Shita", "Madhura", "Medium");

await createFood("Ragi", "Nachni", [
  { key: "Calories", amount: 336 },
  { key: "Protein", amount: 7.3 },
  { key: "Carbohydrate", amount: 72 },
  { key: "Fat", amount: 1.5 },
  { key: "Fiber", amount: 3.6 },
  { key: "Calcium", amount: 344 },
  { key: "Iron", amount: 3.9 },
  { key: "Vitamin C", amount: 0 },
], "Madhura", "Guru", "Kapha", "Shita", "Madhura", "Medium");

await createFood("Rice Bran", "Chawal Ki Bhusi", [
  { key: "Calories", amount: 316 },
  { key: "Protein", amount: 13.3 },
  { key: "Carbohydrate", amount: 64 },
  { key: "Fat", amount: 20 },
  { key: "Fiber", amount: 21 },
  { key: "Calcium", amount: 57 },
  { key: "Iron", amount: 18.5 },
  { key: "Vitamin C", amount: 0 },
], "Madhura", "Guru", "Kapha", "Ushna", "Madhura", "Medium");

console.log("Batch 8 foods created.");

// ---------- Batch 9: 81-90 Foods ----------

await createFood("Black Gram", "Urad Dal", [
  { key: "Calories", amount: 341 },
  { key: "Protein", amount: 25 },
  { key: "Carbohydrate", amount: 59 },
  { key: "Fat", amount: 1.6 },
  { key: "Fiber", amount: 18 },
  { key: "Calcium", amount: 138 },
  { key: "Iron", amount: 7.6 },
  { key: "Vitamin C", amount: 0 },
], "Madhura", "Guru", "Kapha", "Ushna", "Madhura", "Medium");

await createFood("Red Lentil", "Masoor Dal", [
  { key: "Calories", amount: 352 },
  { key: "Protein", amount: 24.6 },
  { key: "Carbohydrate", amount: 60 },
  { key: "Fat", amount: 1.5 },
  { key: "Fiber", amount: 11 },
  { key: "Calcium", amount: 56 },
  { key: "Iron", amount: 7.5 },
  { key: "Vitamin C", amount: 4.5 },
], "Madhura", "Laghu", "Kapha", "Shita", "Madhura", "Medium");

await createFood("Soybeans", "Soyabean", [
  { key: "Calories", amount: 446 },
  { key: "Protein", amount: 36 },
  { key: "Carbohydrate", amount: 30 },
  { key: "Fat", amount: 20 },
  { key: "Fiber", amount: 9 },
  { key: "Calcium", amount: 277 },
  { key: "Iron", amount: 15.7 },
  { key: "Vitamin C", amount: 6 },
], "Madhura", "Guru", "Kapha", "Ushna", "Madhura", "Medium");

await createFood("Pigeon Pea", "Toor Dal", [
  { key: "Calories", amount: 343 },
  { key: "Protein", amount: 21.7 },
  { key: "Carbohydrate", amount: 63 },
  { key: "Fat", amount: 1.5 },
  { key: "Fiber", amount: 15 },
  { key: "Calcium", amount: 73 },
  { key: "Iron", amount: 5.2 },
  { key: "Vitamin C", amount: 0 },
], "Madhura", "Laghu", "Kapha", "Shita", "Madhura", "Medium");

await createFood("Green Pea Dry", "Sukha Matar", [
  { key: "Calories", amount: 118 },
  { key: "Protein", amount: 8 },
  { key: "Carbohydrate", amount: 21 },
  { key: "Fat", amount: 0.4 },
  { key: "Fiber", amount: 8 },
  { key: "Calcium", amount: 25 },
  { key: "Iron", amount: 1.5 },
  { key: "Vitamin C", amount: 1.5 },
], "Madhura", "Laghu", "Kapha", "Shita", "Madhura", "Medium");

await createFood("Horse Gram", "Kulthi Dal", [
  { key: "Calories", amount: 321 },
  { key: "Protein", amount: 22 },
  { key: "Carbohydrate", amount: 57 },
  { key: "Fat", amount: 0.5 },
  { key: "Fiber", amount: 5.3 },
  { key: "Calcium", amount: 287 },
  { key: "Iron", amount: 6.7 },
  { key: "Vitamin C", amount: 1.5 },
], "Madhura", "Laghu", "Kapha", "Ushna", "Madhura", "Medium");

await createFood("Broad Beans", "Bakla", [
  { key: "Calories", amount: 88 },
  { key: "Protein", amount: 8 },
  { key: "Carbohydrate", amount: 19 },
  { key: "Fat", amount: 0.7 },
  { key: "Fiber", amount: 8 },
  { key: "Calcium", amount: 37 },
  { key: "Iron", amount: 1.5 },
  { key: "Vitamin C", amount: 1.4 },
], "Madhura", "Laghu", "Kapha", "Shita", "Madhura", "Medium");

console.log("Batch 9 foods created.");

// ---------- Batch 10: 91-100 Foods ----------
await createFood("Walnut", "Akhrot", [
  { key: "Calories", amount: 654 },
  { key: "Protein", amount: 15.2 },
  { key: "Carbohydrate", amount: 14 },
  { key: "Fat", amount: 65 },
  { key: "Fiber", amount: 6.7 },
  { key: "Calcium", amount: 98 },
  { key: "Iron", amount: 2.9 },
  { key: "Vitamin C", amount: 1.3 },
], "Kashaya", "Guru", "Vata", "Ushna", "Madhura", "Medium");

await createFood("Almond", "Badam", [
  { key: "Calories", amount: 579 },
  { key: "Protein", amount: 21 },
  { key: "Carbohydrate", amount: 22 },
  { key: "Fat", amount: 50 },
  { key: "Fiber", amount: 12.5 },
  { key: "Calcium", amount: 264 },
  { key: "Iron", amount: 3.7 },
  { key: "Vitamin C", amount: 0 },
], "Madhura", "Guru", "Kapha", "Ushna", "Madhura", "Medium");

await createFood("Cashew", "Kaju", [
  { key: "Calories", amount: 553 },
  { key: "Protein", amount: 18 },
  { key: "Carbohydrate", amount: 30 },
  { key: "Fat", amount: 44 },
  { key: "Fiber", amount: 3.3 },
  { key: "Calcium", amount: 37 },
  { key: "Iron", amount: 6.7 },
  { key: "Vitamin C", amount: 0.5 },
], "Madhura", "Guru", "Kapha", "Ushna", "Madhura", "Medium");

await createFood("Pistachio", "Pista", [
  { key: "Calories", amount: 562 },
  { key: "Protein", amount: 20 },
  { key: "Carbohydrate", amount: 28 },
  { key: "Fat", amount: 45 },
  { key: "Fiber", amount: 10 },
  { key: "Calcium", amount: 105 },
  { key: "Iron", amount: 4 },
  { key: "Vitamin C", amount: 5.6 },
], "Madhura", "Guru", "Kapha", "Ushna", "Madhura", "Medium");

await createFood("Peanut", "Moongfali", [
  { key: "Calories", amount: 567 },
  { key: "Protein", amount: 25.8 },
  { key: "Carbohydrate", amount: 16 },
  { key: "Fat", amount: 49 },
  { key: "Fiber", amount: 8.5 },
  { key: "Calcium", amount: 92 },
  { key: "Iron", amount: 4.6 },
  { key: "Vitamin C", amount: 0 },
], "Madhura", "Guru", "Kapha", "Ushna", "Madhura", "Medium");

await createFood("Hazelnut", "Filbert", [
  { key: "Calories", amount: 628 },
  { key: "Protein", amount: 15 },
  { key: "Carbohydrate", amount: 17 },
  { key: "Fat", amount: 61 },
  { key: "Fiber", amount: 10 },
  { key: "Calcium", amount: 114 },
  { key: "Iron", amount: 4.7 },
  { key: "Vitamin C", amount: 6.3 },
], "Madhura", "Guru", "Kapha", "Ushna", "Madhura", "Medium");

await createFood("Pine Nut", "Chilgoza", [
  { key: "Calories", amount: 673 },
  { key: "Protein", amount: 14 },
  { key: "Carbohydrate", amount: 13 },
  { key: "Fat", amount: 68 },
  { key: "Fiber", amount: 3.7 },
  { key: "Calcium", amount: 16 },
  { key: "Iron", amount: 5.5 },
  { key: "Vitamin C", amount: 0 },
], "Madhura", "Guru", "Kapha", "Ushna", "Madhura", "Medium");

await createFood("Brazil Nut", "Brazil Akhrot", [
  { key: "Calories", amount: 656 },
  { key: "Protein", amount: 14.3 },
  { key: "Carbohydrate", amount: 12 },
  { key: "Fat", amount: 66 },
  { key: "Fiber", amount: 7.5 },
  { key: "Calcium", amount: 160 },
  { key: "Iron", amount: 2.4 },
  { key: "Vitamin C", amount: 0.7 },
], "Madhura", "Guru", "Kapha", "Ushna", "Madhura", "Medium");

await createFood("Macadamia Nut", "Macadamia", [
  { key: "Calories", amount: 718 },
  { key: "Protein", amount: 7.9 },
  { key: "Carbohydrate", amount: 14 },
  { key: "Fat", amount: 76 },
  { key: "Fiber", amount: 8.6 },
  { key: "Calcium", amount: 85 },
  { key: "Iron", amount: 3.7 },
  { key: "Vitamin C", amount: 1.2 },
], "Madhura", "Guru", "Kapha", "Ushna", "Madhura", "Medium");

await createFood("Chestnut", "Singhara", [
  { key: "Calories", amount: 213 },
  { key: "Protein", amount: 2.4 },
  { key: "Carbohydrate", amount: 45 },
  { key: "Fat", amount: 2.2 },
  { key: "Fiber", amount: 5.1 },
  { key: "Calcium", amount: 30 },
  { key: "Iron", amount: 0.9 },
  { key: "Vitamin C", amount: 26 },
], "Madhura", "Guru", "Kapha", "Shita", "Madhura", "Medium");

console.log("Batch 10 foods created.");


}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
