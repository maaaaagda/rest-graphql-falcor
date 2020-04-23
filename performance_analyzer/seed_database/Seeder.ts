import { RequestHelpers } from "./RequestHelpers";
import { DatabaseSize, COLLECTION_SIZES } from "./../types/DatabaseSizeTypes";
import { DietOrderGenerator } from "./../generate_data/dietOrders/DietOrderGenerator";
import { IDietOrderGenerator } from "./../generate_data/dietOrders/IDietOrderGenerator";
import { DailyDietGenerator } from "./../generate_data/dailyDiets/DailyDietGenerator";
import { IDailyDietGenerator } from "./../generate_data/dailyDiets/IDailyDietGenerator";
import { DietGenerator } from "./../generate_data/diets/DietGenerator";
import { IDietGenerator } from "./../generate_data/diets/IDietGenerator";
import { MealGenerator } from "./../generate_data/meals/MealGenerator";
import { IMealGenerator } from "./../generate_data/meals/IMealGenerator";
import { UserGenerator } from "../generate_data/users/UserGenerator";
import { IUserGenerator } from "../generate_data/users/IUserGenerator";
import { ISeeder } from "./ISeeder";
import got from "../requests/got";
import { RESTRequestsBase } from "../requests/rest/RESTRequestsBase";

const NR_OF_ADMINISTRATORS_COEFFICIENT = 1 / 100;
const NR_OF_DIETITIANS_COEFFICIENT = 1 / 60;

export class Seeder extends RESTRequestsBase implements ISeeder {

    public async seed(databaseSize: DatabaseSize) {
        try {
            await this.addUsers(COLLECTION_SIZES.users[databaseSize], true);
            await this.addDiets(COLLECTION_SIZES.diets[databaseSize]);
            await this.addMeals(COLLECTION_SIZES.meals[databaseSize]);
            await this.addDailyDiets(COLLECTION_SIZES.dailyDiets[databaseSize]);
            await this.addDietOrders(
                Math.floor(COLLECTION_SIZES.dietOrders[databaseSize] / COLLECTION_SIZES.users[databaseSize]));
        } catch (err) {
            console.log(err);
            console.log(err?.response?.body);
        }
    }

    public addUsers = async (nrOfAllUsers = 10, insertTestUser = false)
    : Promise<void> => {
        const userGenerator: IUserGenerator = new UserGenerator();
        const nrOfAdmins: number = Math.ceil(nrOfAllUsers * NR_OF_ADMINISTRATORS_COEFFICIENT);
        const nrOfDietitians: number = Math.ceil(nrOfAllUsers * NR_OF_DIETITIANS_COEFFICIENT);
        const nrOfUsers: number = nrOfAllUsers - nrOfAdmins - nrOfDietitians;

        let i: number = 0;
        const options = {
            url: this.apiUrl + "users",
            method: "POST",
            body: ""
        };

        if (insertTestUser) {
            options.body = JSON.stringify(userGenerator.generateTestUser());
            await got(options);
        }

        while (i < nrOfUsers) {
            options.body = JSON.stringify(userGenerator.generateRandomUser());
            await got(options);
            i = i + 1;
        }
        i = 0;
        while (i < nrOfAdmins - 1 ) {
            options.body = JSON.stringify(userGenerator.generateRandomUser("admin"));
            await got(options);
            i = i + 1;
        }
        i = 0;
        while (i < nrOfDietitians) {
            options.body = JSON.stringify(userGenerator.generateRandomUser("dietitian"));
            await got(options);
            i = i + 1;
        }
    }

    public addProducts = async (): Promise<void> => {
        const options = {
            url: this.apiUrl + "products/seed",
            method: "POST"
        };
        return await got(options);
    }

    public addMeals = async (nrOfMeals = 10): Promise<void> => {
        const mealGenerator: IMealGenerator = new MealGenerator();
        const options = {
            url: this.apiUrl + "meals",
            method: "POST",
            body: ""
        };
        let i: number = 0;
        const productIds = await RequestHelpers.getAllProductIds();
        while (i < nrOfMeals) {
            options.body = JSON.stringify(mealGenerator.generateRandomMeal(productIds));
            await got(options);
            i = i + 1;
        }
    }

    public async addDiets(nrOfDiets: number): Promise<void> {
        const dietGenerator: IDietGenerator = new DietGenerator();
        const options = {
            url: this.apiUrl + "diets",
            method: "POST",
            body: ""
        };
        let i: number = 0;
    
        while (i < nrOfDiets) {
            options.body = JSON.stringify(dietGenerator.generateRandomDiet());
            await got(options);
            i = i + 1;
        }
        
    }
    public async addDailyDiets(nrOfDietDays: number) {
        const dailyDietGenerator: IDailyDietGenerator = new DailyDietGenerator();
        const options = {
            url: this.apiUrl + "daily-diets",
            method: "POST",
            body: ""
        };
        let i: number = 0;
        const nextDateGeneratorInstance = RequestHelpers.nextDateGenerator();
        const mealIds = await RequestHelpers.getAllMealIds();
        const dietIds = await RequestHelpers.getAllDietIds();
        
        while (i < nrOfDietDays) {
            const date = nextDateGeneratorInstance.next().value as string;
            for (const dietId of dietIds) {
                options.body = JSON.stringify(dailyDietGenerator.generateDailyDiet(date, dietId, mealIds));
                await got(options);
            }
            i = i + 1;
        }
    }
    public async addDietOrders(nrOfOrdersPerPerson: number) {
        const dietOrderGenertor: IDietOrderGenerator = new DietOrderGenerator();
        const options = {
            url: this.apiUrl + "diet-orders",
            method: "POST",
            body: ""
        };
        const kcalOptions: number[] = await RequestHelpers.getKcalOptions();
        const userIds: string[] = await RequestHelpers.getAllUserIds();
        const dietIds = await RequestHelpers.getAllDietIds();    
        for (const userId of userIds) {
            let i = 0;
            while (i < nrOfOrdersPerPerson) {
                options.body = JSON.stringify(dietOrderGenertor.generateRandomDietOrder(dietIds, kcalOptions, userId));
                await got(options);
                i += 1;
            }
        }
    }
}
