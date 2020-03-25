import { initialMetricsResponse, recalculateMetrics } from "./../helpers";
import { API_URL } from "../../common";
import got from "../got";
import { MetricsResponse } from "../../types/Response";

export const addProducts = async (): Promise<MetricsResponse> => {
    const options = {
        url: API_URL + "products/seed",
        method: "POST"
    };
    let metrics = initialMetricsResponse;
    metrics = recalculateMetrics(metrics, await got(options));
    return metrics;
};

export const getProducts = async (name?) => {
    const options = {
        url: `${API_URL}products${name ? `?name=${name}` : ""}`
    };
    let metrics = initialMetricsResponse;
    metrics = recalculateMetrics(metrics, await got(options), true);
    return metrics;
};
