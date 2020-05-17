import { IProductRequests } from "../IProductRequests";
import got from "../got";
import { Response } from "got";
import { RESTRequestsBase } from "./RESTRequestsBase";

export class RESTProductRequests extends RESTRequestsBase implements IProductRequests {
    
    public async getProducts(name: string): Promise<Response<any>> {
        const options = {
            url: `${this.apiUrl}products?name=${name}`
        };
        return await got(options);
    }
}
