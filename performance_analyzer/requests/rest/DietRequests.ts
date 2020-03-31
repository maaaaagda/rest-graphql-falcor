import { IDietRequests } from "../IDietRequests";
import { initialIMetricsResponse, recalculateMetrics } from "../helpers";
import { generateRandomDiet } from "../../generate_data/diets";
import { API_URL } from "../../common";
import got from "../got";
import { IMetricsResponse } from "../../types/IMetricsResponsee";

export class DietRequests implements IDietRequests {
    public addDiets = async (nrOfDiets = 10): Promise<IMetricsResponse> => {
        const options = {
            url: API_URL + "diets",
            method: "POST",
            body: ""
        };
        let i: number = 0;
        let metrics = initialIMetricsResponse;
    
        while (i < nrOfDiets) {
            options.body = JSON.stringify(generateRandomDiet());
            metrics = recalculateMetrics(metrics, await got(options));
            i = i + 1;
        }
      
        return metrics;
    }
    
    public getAllDiets = async (): Promise<IMetricsResponse> => {
        const options = {
            url: API_URL + "diets"
        };
        return recalculateMetrics(initialIMetricsResponse, await got(options), true);
    }
    
    public getDietById = async (id: string): Promise<IMetricsResponse> => {
        const options = {
            url: `${API_URL}diets/${id}`
        };
        return recalculateMetrics(initialIMetricsResponse, await got(options), true);
    }
    
    public getKcalOptions = async () => {
        const options = {
            url: API_URL + "diets/kcal-options"
        };
        return recalculateMetrics(initialIMetricsResponse, await got(options), true);
    }
}
