import { UserRequests } from "./UserRequests";
import { DietRequests } from "./DietRequests";
import { IDietOrderRequests } from "../IDietOrderRequests";
import { IMetricsResponse } from "../../types/IMetricsResponsee";
import { generateRandomDietOrder } from "../../generate_data/dietOrder";
import { initialIMetricsResponse, recalculateMetrics } from "../helpers";
import { API_URL } from "../../common";
import got from "../got";

const MAX_NR_OF_ORDERS_PER_PERSON = 5;

export class DietOrderRequests implements IDietOrderRequests {
    public addDietOrders = async () => {
        const options = {
            url: API_URL + "diet-orders",
            method: "POST",
            body: ""
        };
        let metrics = initialIMetricsResponse;
        const kcalOptions = (await new DietRequests().getKcalOptions()).data.map((kcalOption) => kcalOption.value);
        const userIds = (await new UserRequests().getAllUsers()).data.map((user) => user._id);
        const dietIds = (await new DietRequests().getAllDiets()).data.map((diet) => diet._id);    
        for (const userId of userIds) {
            const nrOfOrders = Math.ceil(Math.random() * MAX_NR_OF_ORDERS_PER_PERSON);
            let i = 0;
            while (i < nrOfOrders) {
                options.body = JSON.stringify(generateRandomDietOrder(dietIds, kcalOptions, userId));
                metrics = recalculateMetrics(metrics, await got(options));
                i += 1;
            }
        }
      
        return metrics;
    }
    
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
