import { Options } from "got";
import { IMealRequests } from "../IMealRequests";
import got from "../got";
import { Response } from "got/dist/source";
import { FalcorRequestsBase } from "./FalcorRequestsBase";
import { IMeal } from "../../generate_data/meals/IMeal";

export class FalcorMealRequests extends FalcorRequestsBase implements IMealRequests {
    
    public getMeals = async (nrOfMeals: number): Promise<Response<string>> => {
        const options: Options = {
            url: `${this.apiUrl}?paths=[["meals",[{"length": ${nrOfMeals}}],["name", "_id"]]]&method=get`
        };

        return got(options);
    }
    
    public getMealById = async (id: string): Promise<Response<string>> => {
        const options = {
            url: `${this.apiUrl}?paths=[["mealsByIds",["${id}"],["name","_id", "photo", "kcal", "protein", "fat", "carbohydrate"]]]&method=get`
        };
        return got(options);
    }

    public addMeal(meal: IMeal): Promise<Response<string>> {
        
        const options: Options = {
            url: this.apiUrl,
            body: JSON.stringify(
                {
                    method: "call",
                    callPath: JSON.stringify(["meal", "add"]),
                    arguments: JSON.stringify(meal),
                    pathSuffixes: JSON.stringify(["_id"])
                }
            ),
            method: "POST"
        };

        return got(options);
    }

    public updateMeal(id: string, meal: IMeal): Promise<Response<string>> {
        const mealWithId: any = {...meal, id};
        const options: Options = {
            url: this.apiUrl,
            body: JSON.stringify(
                {
                    method: "call",
                    callPath: JSON.stringify(["meal", "update"]),
                    arguments: JSON.stringify(mealWithId),
                    pathSuffixes: JSON.stringify(["_id"])
                }
            ),
            method: "POST"
        };

        return got(options);
    }

    public removeMeal(id: string): Promise<Response<string>> {
        const options: Options = {
            url: this.apiUrl,
            body: JSON.stringify(
                {
                    method: "call",
                    callPath: JSON.stringify(["meal", [id], "delete"]),
                    pathSuffixes: JSON.stringify(["delete"])
                }
            ),
            method: "POST"
        };

        return got(options);
    }
}
