import { IMetricsResponse } from "../types/IMetricsResponsee";
export interface IMealRequests {
    getMeals(): Promise<IMetricsResponse>;
    getMealById(id: string): Promise<IMetricsResponse>;
}
