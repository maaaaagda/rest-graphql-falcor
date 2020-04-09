import { Response } from "got";
import { IMealRequests } from "../IMealRequests";
import got from "../got";
import { RESTRequestsBase } from "./RESTRequestsBase";
import { IMeal } from "../../generate_data/meals/IMeal";

export class RESTMealRequests extends RESTRequestsBase implements IMealRequests {

    public async getMealById(id: string): Promise<Response<string>> {
        const options = {
            url: `${this.apiUrl}meals/${id}`
        };
        return got(options);
    }
    
    public async getMeals(): Promise<Response<string>> {
        const options = {
            url: `${this.apiUrl}meals`
        };
        return got(options);
    }

    public addMeal(meal: IMeal): Promise<Response<string>> {
        const options = {
            url: this.apiUrl + "meals",
            method: "POST",
            body: JSON.stringify(meal)
        };
        return got(options);
    }

    public updateMeal(id: string, meal: IMeal): Promise<Response<string>> {
        const options = {
            url: `${this.apiUrl}meals/${id}`,
            method: "PUT",
            body: JSON.stringify(meal)
        };
        return got(options);
    }
}
