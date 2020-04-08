import { IProductRequests } from "../IProductRequests";
import { initialIMetricsResponse, recalculateMetrics } from "../helpers";
import { API_URL } from "../../common";
import got from "../got";
import { IMetricsResponse } from "../../types/IMetricsResponsee";
import { Response } from "got";

export class RESTProductRequests implements IProductRequests {
    
    public async getProducts(name: string): Promise<Response<any>> {
        const options = {
            url: `${API_URL}products?name=${name}`
        };
        return await got(options);
    }
}
