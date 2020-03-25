import { getProducts } from './products';
import { generateRandomMeal } from "./../../generate_data/meals";
import { initialMetricsResponse, recalculateMetrics } from "./../helpers";
import { API_URL } from "../../common";
import got from "../got";
import { MetricsResponse } from "../../types/Response";

export const addMeals = async (nrOfMeals = 10): Promise<MetricsResponse> => {
    const options = {
        url: API_URL + "meals",
        method: "POST",
        body: ""
    };
    let i: number = 0;
    let metrics = initialMetricsResponse;
    const productIds =  (await getProducts()).data.map((product) => product._id);
    while (i < nrOfMeals) {
        options.body = JSON.stringify(generateRandomMeal(productIds));
        metrics = recalculateMetrics(metrics, await got(options));
        i = i + 1;
    }
  
    return metrics;
};

export const getMealById = async (id: string = "461e7160-6ece-11ea-b427-41db59987f93") => {
    const options = {
        url: `${API_URL}meals/${id}`
    };
    let metrics = initialMetricsResponse;
    metrics = recalculateMetrics(metrics, await got(options), true);
  
    return metrics;
};
