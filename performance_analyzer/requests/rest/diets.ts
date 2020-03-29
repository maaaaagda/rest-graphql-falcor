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

export const getAllDiets = async (): Promise<MetricsResponse> => {
    const options = {
        url: API_URL + "diets"
    };
    return recalculateMetrics(initialMetricsResponse, await got(options), true);
};

export const getDietById = async (id: string): Promise<MetricsResponse> => {
    const options = {
        url: `${API_URL}diets/${id}`
    };
    return recalculateMetrics(initialMetricsResponse, await got(options), true);
};

export const getKcalOptions = async () => {
    const options = {
        url: API_URL + "diets/kcal-options"
    };
    return recalculateMetrics(initialMetricsResponse, await got(options), true);
};
