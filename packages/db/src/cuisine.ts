import { prisma } from '.';

async function main() {

    await prisma.cuisine.deleteMany();

    await prisma.cuisine.createMany({
        data: [
            { name: 'Indian' },
            { name: 'Italian' },
            { name: 'Mexican' },
            { name: 'Chinese' },
            { name: 'American' },
            { name: 'Thai' },
            { name: 'French' },
            { name: 'Japanese' },
            { name: 'Mediterranean' },
            { name: 'Spanish' },
            { name: 'Greek' },
            { name: 'Lebanese' },
            { name: 'Turkish' },
            { name: 'Korean' },
            { name: 'Vietnamese' },
            { name: 'Caribbean' },
            { name: 'Ethiopian' },
            { name: 'Moroccan' },
            { name: 'Brazilian' },
            { name: 'German' },
            { name: 'Russian' },
            { name: 'Cuban' },
            { name: 'Persian' },
            { name: 'Pakistani' },
            { name: 'Indonesian' },
            { name: 'Filipino' },
            { name: 'Hungarian' },
            { name: 'Western' },
            { name: 'Middle Eastern' },
            { name: 'Tropical' },
            { name: 'European' },
            { name: 'Snack' },
        ]
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