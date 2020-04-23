import { IDietOrder } from "../../generate_data/dietOrders/IDietOrder";
import got from "../got";
import { Options, Response } from "got";
import { IDietOrderRequests } from "../IDietOrderRequests";
import { GraphQLRequestsBase } from "./GraphQLRequestsBase";

export class GraphQLDietOrderRequests extends GraphQLRequestsBase implements IDietOrderRequests {

    public getAllDietOrders = async (): Promise<Response<string>> => {
        const query = `
            query {
                allDietOrders {
                    dietId
                    kcal
                    cost
                    status
                }
            }
        `;
        const options: Options = {
            url: this.apiUrl,
            body: JSON.stringify({query}),
            method: "POST"
        };

        return got(options);
    }

    public getDietOrders = async (token: string): Promise<Response<string>> => {
        const query = `
            query {
                dietOrders {
                    dietId
                    kcal
                    cost
                    status
                }
            }
        `;
        const options: Options = {
            url: this.apiUrl,
            body: JSON.stringify({query}),
            method: "POST",
            headers: {
                ...got.defaults.options.headers,
                authorization: `Bearer ${token}`
            }
        };

        return got(options);
    }

    public addDietOrder(dietOrder: IDietOrder, token: string): Promise<Response<string>> {
        const query = `
            mutation ($dietOrder: DietOrderInput!) {
                addDietOrder(dietOrder: $dietOrder) { 
                    _id
                }
            }
        `;
        const variables = {
            dietOrder
        };
        
        const options: Options = {
            url: this.apiUrl,
            body: JSON.stringify({query, variables}),
            method: "POST",
            headers: {
                ...got.defaults.options.headers,
                authorization: `Bearer ${token}`
            }
        };

        return got(options);
    }
}
