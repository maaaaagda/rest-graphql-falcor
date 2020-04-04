import { Seeder } from './Seeder';
import { ISeeder } from "./ISeeder";

async function seed() {
    try {
        const seeder: ISeeder = new Seeder();
        seeder.addUsers({nrOfUsers: 100, nrOfAdmins: 3, nrOfDietitians: 10, insertTestUser: true});
        seeder.addDiets(20);
        seeder.addProducts();
        seeder.addMeals(1000);
        seeder.addDailyDiets(30);
        seeder.addDietOrders();
    } catch (err) {
        console.log(err);
        console.log(err?.response?.body);
    }
}

seed();
