import got from "../got";
import { Options, Response } from "got";
import { IProductRequests } from "../IProductRequests";
import { FalcorRequestsBase } from "./FalcorRequestsBase";

export class FalcorProductRequests extends FalcorRequestsBase implements IProductRequests {

    public getProducts = async (name: string): Promise<Response<string>> => {
        const options: Options = {
            url: this.apiUrl,
            body: JSON.stringify(
                {
                    method: "call",
                    callPath: JSON.stringify(["products", "search"]),
                    arguments: JSON.stringify([{name}]),
                    pathSuffixes: "[[{\"length\": 40}], [\"name\", \"kcal\", \"_id\"]]"
                }
            ),
            method: "POST"
        };

        return got(options);
    }
}
