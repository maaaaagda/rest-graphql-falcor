import { RESTAuthRequests } from './../requests/rest/AuthRequests';
import { RESTUserRequests } from "../requests/rest/UserRequests";
import { RESTDietRequests } from "../requests/rest/DietRequests";
import { RESTMealRequests } from "../requests/rest/MealRequests";
import { RESTProductRequests } from "../requests/rest/ProductRequests";
import { Response } from "got";

const NR_OF_MS_IN_A_DAY: number = 86400000;

export class RequestHelpers {
    
    public static async getAllProductIds(): Promise<string[]> {
        const res: Response<string> = await new RESTProductRequests().getProducts("");
        return JSON.parse(res.body).message.map((product) => product._id);    
    }

    public static async getAllMealIds(): Promise<string[]> {
        const res: Response<string> = await new RESTMealRequests().getMeals();
        return JSON.parse(res.body).message.map((meal) => meal._id);
    }
        
    public static async getAllDietIds(): Promise<string[]> {
        const res: Response<string> = await new RESTDietRequests().getAllDiets();
        return JSON.parse(res.body).message.map((diet) => diet._id);
    }

    public static async getAllUserIds(): Promise<string[]> {
        const res: Response<string> = await new RESTUserRequests().getAllUsers();
        return JSON.parse(res.body).message.map((user) => user._id);
    }

    public static async getKcalOptions(): Promise<number[]> {
        const res: Response<string> = await new RESTDietRequests().getKcalOptions();
        return JSON.parse(res.body).message.map((kcalOption) => kcalOption.value);
    }

    public static async getTestUserToken(): Promise<string> {
        const res: Response<string> = await new RESTAuthRequests().login();
        return JSON.parse(res.body).message.token;
    }

    public static *nextDateGenerator() {
        let currentDateMs = new Date().getTime();
        while (true) {
            currentDateMs += NR_OF_MS_IN_A_DAY;
            const currentDate = new Date(currentDateMs).toISOString();
    
            yield currentDate.slice(0, 10);
        }
    }
}
