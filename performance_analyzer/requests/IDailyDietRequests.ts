import { IMetricsResponse } from "../types/IMetricsResponsee";

export interface IDailyDietRequests {
    getDailyDiet(date: string, dietId: string): Promise<IMetricsResponse>;
}
