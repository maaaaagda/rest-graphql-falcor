import { IDietOrderRequests } from "../IDietOrderRequests";
import { IMetricsResponse } from "../../types/IMetricsResponsee";
import { initialIMetricsResponse, recalculateMetrics } from "../helpers";
import { API_URL } from "../../common";
import got from "../got";

export class DietOrderRequests implements IDietOrderRequests {
    
    public getAllDietOrders = async (): Promise<IMetricsResponse> => {
        const options = {
            url: API_URL + "diet-orders/all"
        };
        return recalculateMetrics(initialIMetricsResponse, await got(options), true);
    }
    
    public getDietOrders = async (token: string): Promise<IMetricsResponse> => {
        const options = {
            url: API_URL + "diet-orders",
            headers: {
                ...got.defaults.options.headers,
                authorization: `Bearer ${token}`
            }
        };
        return recalculateMetrics(initialIMetricsResponse, await got(options), true);
    }
}
