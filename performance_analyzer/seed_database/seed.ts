import { addDietOrders } from "./../requests/rest/dietOrders";
import { addDailyDiets } from "./../requests/rest/dailyDiets";
import { addMeals } from "./../requests/rest/meals";
import { addProducts } from "./../requests/rest/products";
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
    } catch (err) {
        console.log(err);
        console.log(err?.response?.body);
    }
}

seed();
