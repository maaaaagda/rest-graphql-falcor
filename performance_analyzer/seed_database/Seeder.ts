import { DatabaseSize, COLLECTION_SIZES } from "./../types/DatabaseSizeTypes";
import { DietOrderGenerator } from "./../generate_data/dietOrders/DietOrderGenerator";
import { IDietOrderGenerator } from "./../generate_data/dietOrders/IDietOrderGenerator";
import { RESTUserRequests } from "./../requests/rest/UserRequests";
import { DailyDietGenerator } from "./../generate_data/dailyDiets/DailyDietGenerator";
import { IDailyDietGenerator } from "./../generate_data/dailyDiets/IDailyDietGenerator";
import { RESTDietRequests } from "./../requests/rest/DietRequests";
import { RESTMealRequests } from "./../requests/rest/MealRequests";
import { DietGenerator } from "./../generate_data/diets/DietGenerator";
import { IDietGenerator } from "./../generate_data/diets/IDietGenerator";
import { Response } from "got";
import { MealGenerator } from "./../generate_data/meals/MealGenerator";
import { IMealGenerator } from "./../generate_data/meals/IMealGenerator";
import { UserGenerator } from "../generate_data/users/UserGenerator";
import { IUserGenerator } from "../generate_data/users/IUserGenerator";
import { ISeeder } from "./ISeeder";
import { RESTRequestsBase } from "../requests/rest/RESTRequestsBase";
import got from "../requests/got";
import { RESTProductRequests } from "../requests/rest/ProductRequests";

const NR_OF_MS_IN_A_DAY: number = 86400000;
const NR_OF_ADMINISTRATORS_COEFFICIENT = 1 / 100;
const NR_OF_DIETITIANS_COEFFICIENT = 1 / 60;

export class Seeder extends RESTRequestsBase implements ISeeder {

    public async seed(databaseSize: DatabaseSize) {
        try {
            await this.addUsers(COLLECTION_SIZES.users[databaseSize], false);
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
        const productIds = await this.getAllProductIds();
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
        const nextDateGeneratorInstance = this.nextDateGenerator();
        const mealIds = await this.getAllMealIds();
        const dietIds = await this.getAllDietIds();
        
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
        const kcalOptions: number[] = await this.getKcalOptions();
        const userIds: string[] = await this.getAllUserIds();
        const dietIds = await this.getAllDietIds();    
        for (const userId of userIds) {
            let i = 0;
            while (i < nrOfOrdersPerPerson) {
                options.body = JSON.stringify(dietOrderGenertor.generateRandomDietOrder(dietIds, kcalOptions, userId));
                await got(options);
                i += 1;
            }
        }
    }

    private async getAllProductIds(): Promise<string[]> {
        const res: Response<string> = await new RESTProductRequests().getProducts("");
        return JSON.parse(res.body).message.map((product) => product._id);    
    }

    private async getAllMealIds(): Promise<string[]> {
        const res: Response<string> = await new RESTMealRequests().getMeals();
        return JSON.parse(res.body).message.map((meal) => meal._id);
    }
        
    private async getAllDietIds(): Promise<string[]> {
        const res: Response<string> = await new RESTDietRequests().getAllDiets();
        return JSON.parse(res.body).message.map((diet) => diet._id);
    }

    private async getAllUserIds(): Promise<string[]> {
        const res: Response<string> = await new RESTUserRequests().getAllUsers();
        return JSON.parse(res.body).message.map((user) => user._id);
    }

    private async getKcalOptions(): Promise<number[]> {
        const res: Response<string> = await new RESTDietRequests().getKcalOptions();
        return JSON.parse(res.body).message.map((kcalOption) => kcalOption.value);
    }

    private *nextDateGenerator() {
        let currentDateMs = new Date().getTime();
        while (true) {
            currentDateMs += NR_OF_MS_IN_A_DAY;
            const currentDate = new Date(currentDateMs).toISOString();
    
            yield currentDate.slice(0, 10);
        }
    }
}
