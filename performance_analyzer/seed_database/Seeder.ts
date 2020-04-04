import { DietOrderGenerator } from "./../generate_data/dietOrders/DietOrderGenerator";
import { IDietOrderGenerator } from "./../generate_data/dietOrders/IDietOrderGenerator";
import { IDietOrder } from "./../../graphql/src/api/dietOrder/model/DietOrder";
import { RESTUserRequests } from "./../requests/rest/UserRequests";
import { DailyDietGenerator } from "./../generate_data/dailyDiets/DailyDietGenerator";
import { IDailyDietGenerator } from "./../generate_data/dailyDiets/IDailyDietGenerator";
import { DietRequests } from "./../requests/rest/DietRequests";
import { MealRequests } from "./../requests/rest/MealRequests";
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
import { ProductRequests } from "../requests/rest/ProductRequests";

const NR_OF_MS_IN_A_DAY: number = 86400000;
const MAX_NR_OF_ORDERS_PER_PERSON = 5;

export class Seeder extends RESTRequestsBase implements ISeeder {

    public addUsers = async ({ nrOfUsers = 10, nrOfAdmins = 1, nrOfDietitians = 1, insertTestUser = false} = {})
    : Promise<void> => {
        const userGenerator: IUserGenerator = new UserGenerator();

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
    public async addDietOrders() {
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
            const nrOfOrders = Math.ceil(Math.random() * MAX_NR_OF_ORDERS_PER_PERSON);
            let i = 0;
            while (i < nrOfOrders) {
                options.body = JSON.stringify(dietOrderGenertor.generateRandomDietOrder(dietIds, kcalOptions, userId));
                await got(options);
                i += 1;
            }
        }
    }

    private async getAllProductIds(): Promise<string[]> {
        const res: Response<string> = await new ProductRequests().getProducts();
        return JSON.parse(res.body).message.map((product) => product._id);    }

    private async getAllMealIds(): Promise<string[]> {
        const res: Response<string> = await new MealRequests().getMeals();
        return JSON.parse(res.body).message.map((meal) => meal._id);
    }
        
    private async getAllDietIds(): Promise<string[]> {
        const res: Response<string> = await new DietRequests().getAllDiets();
        return JSON.parse(res.body).message.map((diet) => diet._id);
    }

    private async getAllUserIds(): Promise<string[]> {
        const res: Response<string> = await new RESTUserRequests().getAllUsers();
        return JSON.parse(res.body).message.map((user) => user._id);
    }

    private async getKcalOptions(): Promise<number[]> {
        const res: Response<string> = await new DietRequests().getKcalOptions();
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
