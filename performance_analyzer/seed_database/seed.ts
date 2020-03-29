import { addDietOrders, getAllDietOrders } from "./../requests/rest/dietOrders";
import { addDailyDiets, getDailyDiet } from "./../requests/rest/dailyDiets";
import { addMeals, getMealById } from "./../requests/rest/meals";
import { addProducts, getProducts } from "./../requests/rest/products";
import { addDiets } from "./../requests/rest/diets";
import { addUsers } from "../requests/rest/users";

async function seed() {
    try {
    await addUsers({nrOfUsers: 100, nrOfAdmins: 3, nrOfDietitians: 10, insertTestUser: true});
    await addDiets(20);
    await addProducts();
    await addMeals(1000);
    await addDailyDiets(30);
    await addDietOrders();

    // console.log((await getAllDietOrders()).data);
    // console.log(await getDailyDiet("2020-03-27", "16cfe8b0-6df9-11ea-8f8b-41bd9c6f65b2"));
    // console.log(await getProducts("apple"));
    // console.log((await getMealById("1573f590-6ed2-11ea-8358-dda72ac163d6")).data);
    } catch (err) {
        console.log(err);
        console.log(err?.response?.body);
    }
}

seed();
