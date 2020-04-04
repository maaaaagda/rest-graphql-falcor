export interface ISeeder {
    addUsers();
    addDiets(nrOfDiets: number);
    addProducts();
    addMeals(nrOfMeals: number);
    addDailyDiets(nrOfMonths: number);
    addDietOrders();
}
