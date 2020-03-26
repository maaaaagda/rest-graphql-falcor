import { addDailyDiets, getDailyDiet } from "./../requests/rest/dailyDiets";
import { addMeals, getMealById } from "./../requests/rest/meals";
import { addProducts, getProducts } from "./../requests/rest/products";
import { addDiets } from "./../requests/rest/diets";
import { addUsers } from "../requests/rest/users";

async function seed() {
    try {
    // await addUsers();
    // await addDiets();
    // await addProducts();
    // await addMeals(10);
    // await addDailyDiets(20);
    
    // console.log(await getDailyDiet("2020-03-27", "16cfe8b0-6df9-11ea-8f8b-41bd9c6f65b2"));

    // console.log(await getProducts(""));
    // console.log((await getMealById("1573f590-6ed2-11ea-8358-dda72ac163d6")).data);
    } catch (err) {
        console.log(err);
        console.log(err?.response?.body);
    }
}

seed();
