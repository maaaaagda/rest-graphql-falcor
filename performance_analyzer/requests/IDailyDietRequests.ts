import { IMetricsResponse } from "./../types/Response";

export interface IDailyDietRequests {
    getDailyDiet(date: string, dietId: string): Promise<IMetricsResponse>;
}