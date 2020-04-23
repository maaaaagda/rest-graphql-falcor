import { Options } from "got";
import { IDietOrderRequests } from "../IDietOrderRequests";
import got from "../got";
import { Response } from "got/dist/source";
import { FalcorRequestsBase } from "./FalcorRequestsBase";
import { IDietOrder } from "../../generate_data/dietOrders/IDietOrder";

export class FalcorDietOrderRequests extends FalcorRequestsBase implements IDietOrderRequests {
    
    public getAllDietOrders = async (): Promise<Response<string>> => {
        const options: Options = {
            url: this.apiUrl,
            body: JSON.stringify(
                {
                    method: "call",
                    callPath: JSON.stringify(["dietOrders", "all"]),
                    arguments: "",
                    pathSuffixes: JSON.stringify(["_id", "kcal", "status", "cost"])
                }
            ),
            method: "POST"
        };

        return got(options);
    }

    public getDietOrders = async (): Promise<Response<string>> => {
        const options: Options = {
            url: this.apiUrl,
            body: JSON.stringify(
                {
                    method: "call",
                    callPath: JSON.stringify(["dietOrders", "user"]),
                    arguments: "",
                    pathSuffixes: JSON.stringify(["_id", "kcal", "status", "cost"])
                }
            ),
            method: "POST"
        };

        return got(options);
    }


    public addDietOrder(dietOrder: IDietOrder): Promise<Response<string>> {     
        const options: Options = {
            url: this.apiUrl,
            body: JSON.stringify(
                {
                    method: "call",
                    callPath: JSON.stringify(["dietOrder", "add"]),
                    arguments: JSON.stringify(dietOrder),
                    pathSuffixes: JSON.stringify(["_id"])
                }
            ),
            method: "POST"
        };

        return got(options);
    }
}
