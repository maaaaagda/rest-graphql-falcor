import { DietOrderRequests } from "./../requests/rest/DietOrderRequests";
import { DailyDietRequests } from "./../requests/rest/DailyDietRequests";
import { MealRequests } from "./../requests/rest/MealRequests";
import { ProductRequests } from "./../requests/rest/ProductRequests";
import { DietRequests } from "./../requests/rest/DietRequests";
import { UserRequests } from "./../requests/rest/UserRequests";

async function seed() {
    try {
        await new UserRequests().addUsers({nrOfUsers: 100, nrOfAdmins: 3, nrOfDietitians: 10, insertTestUser: true});
        await new DietRequests().addDiets(20);
        await new ProductRequests().addProducts();
        await new MealRequests().addMeals(1000);
        await new DailyDietRequests().addDailyDiets(30);
        await new DietOrderRequests().addDietOrders();
    } catch (err) {
        console.log(err);
        console.log(err?.response?.body);
    }
}

seed();
