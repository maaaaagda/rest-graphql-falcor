import { IProductRequests } from "./../IProductRequests";
import got from "../got";
import { Options, Response } from "got";
import { GraphQLRequestsBase } from "./GraphQLRequestsBase";

export class GraphQLProductRequests extends GraphQLRequestsBase implements IProductRequests {

    public getProducts = async (name: string): Promise<Response<string>> => {
        const query = `
            query($name: String) {
                products(name: $name) {
                    name
                    _id
                    kcal
                }
            }
        `;
        const variables = {
            name
        };
        const options: Options = {
            url: this.apiUrl,
            body: JSON.stringify({query, variables}),
            method: "POST"
        };

        return got(options);
    }
}
