import { Response } from "got";
import { IMealRequests } from "../IMealRequests";
import { API_URL } from "../../common";
import got from "../got";

export class MealRequests implements IMealRequests {

    public async getMealById(id: string): Promise<Response<string>> {
        const options = {
            url: `${API_URL}meals/${id}`
        };
        return got(options);
    }
    
    public async getMeals(): Promise<Response<string>> {
        const options = {
            url: `${API_URL}meals`
        };
        return got(options);
    }
}
