import { IDietRequests } from "../IDietRequests";
import { initialIMetricsResponse, recalculateMetrics } from "../helpers";
import { API_URL } from "../../common";
import got from "../got";
import { IMetricsResponse } from "../../types/IMetricsResponsee";
import { Response } from "got/dist/source";

export class DietRequests implements IDietRequests {
    
    public getAllDiets = async (): Promise<Response<string>> => {
        const options = {
            url: API_URL + "diets"
        };
        return got(options);
    }
    
    public getDietById = async (id: string): Promise<Response> => {
        const options = {
            url: `${API_URL}diets/${id}`
        };
        return got(options);
    }
    
    public getKcalOptions = async () => {
        const options = {
            url: API_URL + "diets/kcal-options"
        };
        return await got(options);
    }
}
