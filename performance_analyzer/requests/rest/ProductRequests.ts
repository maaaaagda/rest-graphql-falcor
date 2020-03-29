import { IProductRequests } from "../IProductRequests";
import { initialIMetricsResponse, recalculateMetrics } from "../helpers";
import { API_URL } from "../../common";
import got from "../got";
import { IMetricsResponse } from "../../types/Response";

export class ProductRequests implements IProductRequests {
    public addProducts = async (): Promise<IMetricsResponse> => {
        const options = {
            url: API_URL + "products/seed",
            method: "POST"
        };
        let metrics = initialIMetricsResponse;
        metrics = recalculateMetrics(metrics, await got(options));
        return metrics;
    }
    
    public getProducts = async (name?) => {
        const options = {
            url: `${API_URL}products${name ? `?name=${name}` : ""}`
        };
        let metrics = initialIMetricsResponse;
        metrics = recalculateMetrics(metrics, await got(options), true);
        return metrics;
    }
}
