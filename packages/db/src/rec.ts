import {prisma} from '.';

async function main() {

    const cuisine = await prisma.cuisine.findMany();
    const recipesMap: Record<string, string> = Object.fromEntries(cuisine.map(c => [c.name, c.cuisine_id]));

    const foods = await prisma.food.findMany();
    const foodsMMap: Record<string, string> = Object.fromEntries(foods.map(f => [f.name, f.food_id]));

    async function createRec(
        name: string,
        cuisine: string,
        foods: { name: string, amount: number}[]
    ) {
        await prisma.recipe.create({
            data: {
                name,
                cuisine_id: recipesMap[cuisine]!,
                RecipeIngredient: {
                    createMany: {
                        data: foods.map(f => ({
                            food_id: foodsMMap[f.name]!,
                            quantity: f.amount!
                        }))
                    }
                }
            }
        })
    }

    await prisma.recipeIngredient.deleteMany();
    console.log('cleared recipe ingredients');
    await prisma.recipe.deleteMany();
    console.log('cleared recipes');

    await createRec("Tomato Spinach Dal", "Indian", [
        { name: "Lentils", amount: 100},
        { name:"Tomato", amount: 150},
        { name: "Spinach", amount: 100},
        { name: "Onion", amount: 50},
    ])

    console.log(" 1 recipe done");
    

    await createRec("Vegetable Stir Fry with Capsicum and Carrot", "Chinese", [
        { name: "Carrot", amount: 100},
        { name: "Capsicum", amount: 100},
        { name: "Onion", amount: 50},
    ])

    console.log(" 2 recipe done");
    await createRec("Mashed Sweet Potato and Beetroot Salad", "Western", [
        { name: "Sweet Potato", amount: 200},
        { name: "Beetroot", amount: 100},
        { name: "Mint Leaves", amount: 10},
    ])

    console.log(" 3 recipe done");

    await createRec("Chickpea and Spinach Curry", "Indian", [
        { name: "Chickpeas", amount: 150},
        { name: "Spinach", amount: 150},
        { name: "Onion", amount: 50},
        { name: "Tomato", amount: 100},
    ])

    console.log(" 4 recipe done");
    await createRec("Pumpkin Lentil Soup", "Middle Eastern", [
        { name: "Pumpkin", amount: 200},
        { name: "Lentils", amount: 100},
        { name: "Onion", amount: 50},
    ])

    console.log(" 5 recipe done");
    await createRec("Guava and Pineapple Fruit Salad", "Tropical", [
        { name: "Guava", amount: 100},
        { name: "Pineapple", amount: 150},
        { name: "Mint Leaves", amount: 5},
    ])

    console.log(" 6 recipe done");

    await createRec("Kidney Bean and Rice Bowl", "Mexican", [
        { name: "Kidney Beans", amount: 150},
        { name: "Rice", amount: 100},
        { name: "Tomato", amount: 100},
        { name: "Onion", amount: 50},
    ])

    console.log(" 7 recipe done");
    
    await createRec("Bitter Gourd Stir Fry", "Indian", [
        { name: "Bitter Gourd", amount: 150},
        { name: "Onion", amount: 50},
    ])

    console.log(" 8 recipe done");

    await createRec("Zucchini and French Beans Sauté", "Mediterranean", [
        { name: "Zucchini", amount: 150},
        { name: "French Beans", amount: 100},
    ])

    console.log(" 9 recipe done");

    await createRec("Banana and Blueberry Smoothie", "Western", [
        { name: "Banana", amount: 120},
        { name: "Blueberry", amount: 100},
    ])

    console.log("10 recipes done");
    

    await createRec("Stuffed Capsicum with Quinoa and Vegetables", "Mediterranean", [
        { name: "Capsicum", amount: 200},
        { name: "Quinoa", amount: 100},
        { name: "Tomato", amount: 100},
        { name: "Onion", amount: 50},
    ])

    console.log("11 recipes done");
    

    await createRec("Ridge Gourd and Lentil Stew", "Indian", [
        { name: "Ridge Gourd", amount: 150},
        { name: "Lentils", amount: 100},
        { name: "Onion", amount: 50},
    ])
    
    console.log("12 recipes done");

    await createRec("Spinach and Almond Pesto", "Italian", [
        { name: "Spinach", amount: 100},
        { name: "Almond", amount: 50},
    ])

    console.log("13 recipes done");

    await createRec("Chickpea and Carrot Patties", "Middle Eastern", [
        { name: "Chickpeas", amount: 150},
        { name: "Carrot", amount: 100},
        { name: "Onion", amount: 50},
    ])

    console.log("14 recipes done");

    await createRec("Pomegranate and Mint Salad", "Middle Eastern", [
        { name: "Pomegranate", amount: 100},
        { name: "Mint Leaves", amount: 10},
        { name: "Cucumber", amount: 100},
    ])

    console.log("15 recipes done");

    await createRec("Mashed Potato and Turnip Side Dish", "European", [
        { name: "Potato", amount: 150},
        { name: "Turnip", amount: 100},
    ])

    console.log("16 recipes done");
    
    await createRec("Mixed Nut and Fruit Trail Mix", "Snack", [
        { name: "Walnut", amount: 30},
        { name: "Cashew", amount: 30},
        { name: "Almond", amount: 30},
        { name: "Dates", amount: 50},
        { name: "Fig", amount: 50},
    ])

    console.log("17 recipes done");

    await createRec("French Beans and Tomato Curry", "Indian", [
        { name: "French Beans", amount: 150},
        { name: "Tomato", amount: 100},
        { name: "Onion", amount: 50},
    ])

    console.log("18 recipes done");

    await createRec("Rice and Vegetable Pilaf", "Indian", [
        { name: "Rice", amount: 150},
        { name: "Carrot", amount: 100},
        { name: "Peas", amount: 50},
        { name: "Onion", amount: 50},
    ])

    console.log("19 recipes done");
    
    await createRec("Carrot and Coriander Soup", "Western", [
        { name: "Carrot", amount: 200},
        { name: "Coriander Leaves", amount: 20},
        { name: "Onion", amount: 50},
    ])

    console.log("20 recipes done");
    
    await createRec("Banana and Walnut Bread", "Western", [
        { name: "Banana", amount: 200},
        { name: "Walnut", amount: 50},
        { name: "Wheat", amount: 150},
    ])
    

    console.log("21 recipes done");

    await createRec("Beetroot and Apple Salad", "European", [
        { name: "Beetroot", amount: 150},
        { name: "Apple", amount: 100},
        { name: "Coriander Leaves", amount: 10},
    ])

    console.log("22 recipes done");


    await createRec("Peas and Mint Rice", "Indian", [
        { name: "Rice", amount: 150},
        { name: "Peas", amount: 100},
        { name: "Mint Leaves", amount: 10},
    ])

    console.log("23 recipes done");

    await createRec("Sweet Potato and Black Gram Curry", "Indian", [
        { name: "Sweet Potato", amount: 150},
        { name: "Black Gram", amount: 100},
        { name: "Onion", amount: 50},
        { name: "Tomato", amount: 100},
    ])
    
    console.log("24 recipes done");

    await createRec("Corn and Capsicum Salad", "Mexican", [
        { name: "Corn", amount: 150},
        { name: "Capsicum", amount: 100},
        { name: "Onion", amount: 50},
    ])

    console.log("25 recipes done");
    
    console.log('seeded recipes');
}


main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });