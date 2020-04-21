import { Response } from "got";
import { IDailyDiet } from "./../../generate_data/dailyDiets/IDailyDiet";
import { IDailyDietRequests } from "../IDailyDietRequests";
import got from "../got";
import { RESTRequestsBase } from "./RESTRequestsBase";

export class RESTDailyDietRequests extends RESTRequestsBase implements IDailyDietRequests {
    
    public async getDailyDiets(date: string, dietId: string): Promise<Response<string>> {
        const options = {
            url: `${this.apiUrl}daily-diets?date=${date}&dietId=${dietId}`
        };
        return await got(options);
    }

    public async addDailyDiet(dailyDiet: IDailyDiet): Promise<Response<string>> {
        const options = {
            url: this.apiUrl + "daily-diets",
            method: "POST",
            body: JSON.stringify(dailyDiet)
        };
        return got(options);
    }

    public async updateDailyDiet(id: string, dailyDiet: IDailyDiet): Promise<Response<string>> {
        const options = {
            url: `${this.apiUrl}daily-diets/${id}`,
            method: "PUT",
            body: JSON.stringify(dailyDiet)
        };
        return got(options);
    }
}
