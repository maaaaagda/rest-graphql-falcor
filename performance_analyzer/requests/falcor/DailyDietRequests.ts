import { IDailyDiet } from "./../../generate_data/dailyDiets/IDailyDiet";
import { Options } from "got";
import { IDailyDietRequests } from "../IDailyDietRequests";
import got from "../got";
import { Response } from "got/dist/source";
import { FalcorRequestsBase } from "./FalcorRequestsBase";

export class FalcorDailyDietRequests extends FalcorRequestsBase implements IDailyDietRequests {
    
    public getDailyDiets = async (date: string, dietId: string): Promise<Response<string>> => {
        const options: Options = {
            url: this.apiUrl,
            body: JSON.stringify(
                {
                    method: "call",
                    callPath: JSON.stringify(["dailyDietMeals", "search"]),
                    arguments: JSON.stringify([{date, dietId}]),
                    pathSuffixes: JSON.stringify(
                        [["breakfast", "morningSnack", "lunch", "afternoonSnack", "dinner"],
                        ["name", "photoUrl", "_id"]])
                }
            ),
            method: "POST"
        };

        return got(options);
    }

    public addDailyDiet(dailyDailyDiet: IDailyDiet): Promise<Response<string>> {
        
        const options: Options = {
            url: this.apiUrl,
            body: JSON.stringify(
                {
                    method: "call",
                    callPath: JSON.stringify(["dailyDiet", "add"]),
                    arguments: JSON.stringify(dailyDailyDiet),
                    pathSuffixes: JSON.stringify(["_id"])
                }
            ),
            method: "POST"
        };

        return got(options);
    }

    public updateDailyDiet(id: string, dailyDailyDiet: IDailyDiet): Promise<Response<string>> {
        const dailyDailyDietWithId: any = {...dailyDailyDiet, id};
        const options: Options = {
            url: this.apiUrl,
            body: JSON.stringify(
                {
                    method: "call",
                    callPath: JSON.stringify(["dailyDiet", "update"]),
                    arguments: JSON.stringify(dailyDailyDietWithId),
                    pathSuffixes: JSON.stringify(["_id"])
                }
            ),
            method: "POST"
        };

        return got(options);
    }
}
