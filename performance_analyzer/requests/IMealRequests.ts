import { IMetricsResponse } from "./../types/Response";
export interface IMealRequests {
    getMeals(): Promise<IMetricsResponse>;
    getMealById(id: string): Promise<IMetricsResponse>;
}
