import { DatabaseSize } from "./../types/DatabaseSizeTypes";
export interface ISeeder {
    seed(databaseSize: DatabaseSize);
    addUsers(nrOfUsers: number, insertTestUser: boolean);
    addDiets(nrOfDiets: number);
    addProducts();
    addMeals(nrOfMeals: number);
    addDailyDiets(nrOfMonths: number);
    addDietOrders(nrOfOrdersPerPerson: number);
}
