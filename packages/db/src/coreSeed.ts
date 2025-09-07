    import {prisma} from '.';

async function main() {

    await prisma.rasa.deleteMany();
    await prisma.guna.deleteMany();
    await prisma.dosha.deleteMany();
    await prisma.virya.deleteMany();
    await prisma.vipaka.deleteMany();
    await prisma.digestibility.deleteMany();
    await prisma.nutrient.deleteMany();

    await prisma.rasa.createMany({
    data: [
        { name: "Madhura" },
        { name: "Amla" },
        { name: "Lavana" },
        { name: "Katu" },
        { name: "Tikta" },
        { name: "Kashaya" },
    ],
    });

    await prisma.guna.createMany({
    data: [
        { name: "Laghu" },
        { name: "Guru" },
        { name: "Snigdha" },
        { name: "Ruksha" },
        { name: "Ushna" },
        { name: "Shita" },
    ],
    });

    await prisma.dosha.createMany({
    data: [
        { name: "Vata" },
        { name: "Pitta" },
        { name: "Kapha" },
    ],
    });

    await prisma.virya.createMany({
    data: [
        { name: "Ushna" },
        { name: "Shita" },
    ],
    });

    await prisma.vipaka.createMany({
    data: [
        { name: "Madhura" },
        { name: "Amla" },
        { name: "Katu" },
    ],
    });

    await prisma.digestibility.createMany({
    data: [
        { name: "Easy" },
        { name: "Medium" },
        { name: "Heavy" },
    ],
    });


    await prisma.nutrient.createMany({
    data: [
        { name: "Calories", unit: "kcal" },
        { name: "Protein", unit: "g" },
        { name: "Carbohydrate", unit: "g" },
        { name: "Fat", unit: "g" },
        { name: "Fiber", unit: "g" },
        { name: "Calcium", unit: "mg" },
        { name: "Iron", unit: "mg" },
        { name: "Vitamin C", unit: "mg" },
    ],
    });


}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });