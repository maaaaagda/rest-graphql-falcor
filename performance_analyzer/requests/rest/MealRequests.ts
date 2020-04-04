import { IMealRequests } from "../IMealRequests";
import { ProductRequests } from "./ProductRequests";
import { generateRandomMeal } from "../../generate_data/meals";
import { initialIMetricsResponse, recalculateMetrics } from "../helpers";
import { API_URL } from "../../common";
import got from "../got";
import { IMetricsResponse } from "../../types/IMetricsResponsee";

export class MealRequests implements IMealRequests {
    public addMeals = async (nrOfMeals = 10): Promise<IMetricsResponse> => {
        const options = {
            url: API_URL + "meals",
            method: "POST",
            body: ""
        };
        let i: number = 0;
        let metrics = initialIMetricsResponse;
        const productIds =  (await new ProductRequests().getProducts()).data.map((product) => product._id);
        while (i < nrOfMeals) {
            options.body = JSON.stringify(generateRandomMeal(productIds));
            metrics = recalculateMetrics(metrics, await got(options));
            i = i + 1;
        }
      
        return metrics;
    }
    
    public getMealById = async (id: string = "461e7160-6ece-11ea-b427-41db59987f93")
    : Promise<IMetricsResponse> => {
        const options = {
            url: `${API_URL}meals/${id}`
        };
        let metrics = initialIMetricsResponse;
        metrics = recalculateMetrics(metrics, await got(options), true);
      
        return metrics;
    }
    
    public getMeals = async (): Promise<IMetricsResponse> => {
        const options = {
            url: `${API_URL}meals`
        };
        return recalculateMetrics(initialIMetricsResponse, await got(options), true);
    }
}
