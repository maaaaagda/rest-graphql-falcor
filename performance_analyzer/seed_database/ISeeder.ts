export interface ISeeder {
    addUsers(addUserParams: {nrOfUsers: number, nrOfAdmins: number, nrOfDietitians: number, insertTestUser: boolean});
    addDiets(nrOfDiets: number);
    addProducts();
    addMeals(nrOfMeals: number);
    addDailyDiets(nrOfMonths: number);
    addDietOrders();
}
