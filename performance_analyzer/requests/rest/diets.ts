import { initialMetricsResponse, recalculateMetrics } from "./../helpers";
import { generateRandomDiet } from "./../../generate_data/diets";
import { API_URL } from "../../common";
import got from "../got";
import { MetricsResponse } from "../../types/Response";

export const addDiets = async (nrOfDiets = 10): Promise<MetricsResponse> => {
    const options = {
        url: API_URL + "diets",
        method: "POST",
        body: ""
    };
    let i: number = 0;
    let metrics = initialMetricsResponse;

    while (i < nrOfDiets) {
        options.body = JSON.stringify(generateRandomDiet());
        metrics = recalculateMetrics(metrics, await got(options));
        i = i + 1;
    }
  
    return metrics;
};

export const getAllDiets = async (token: string): Promise<MetricsResponse> => {
    const options = {
        url: API_URL + "diets",
        headers: {
        ...got.defaults.options.headers,
        authorization: `Bearer ${token}`
        }
    };
    const res = await got(options);
    return {
        timings: res.timings.phases,
        size: res.body.length,
        data: JSON.parse(res.body)
    };
};
