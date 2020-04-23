import { IDietOrder } from './../../generate_data/dietOrders/IDietOrder';
import { Response } from 'got';
import { IDietOrderRequests } from "../IDietOrderRequests";
import got from "../got";
import { RESTRequestsBase } from "./RESTRequestsBase";

export class RESTDietOrderRequests extends RESTRequestsBase implements IDietOrderRequests {
    
    public getAllDietOrders = async (): Promise<Response<string>> => {
        const options = {
            url: this.apiUrl + "diet-orders/all"
        };
        return got(options);
    }
    
    public getDietOrders = async (token: string): Promise<Response<string>> => {
        const options = {
            url: this.apiUrl + "diet-orders",
            headers: {
                ...got.defaults.options.headers,
                authorization: `Bearer ${token}`
            }
        };
        return got(options);
    }

    public async addDietOrder(dailyDiet: IDietOrder, token: string): Promise<Response<string>> {
        const options = {
            url: this.apiUrl + "diet-orders",
            method: "POST",
            body: JSON.stringify(dailyDiet),
            headers: {
                ...got.defaults.options.headers,
                authorization: `Bearer ${token}`
            }
        };
        return got(options);
    }
}
