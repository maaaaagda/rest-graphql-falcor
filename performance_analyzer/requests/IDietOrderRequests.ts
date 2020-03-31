import { IMetricsResponse } from "../types/IMetricsResponsee";

export interface IDietOrderRequests {
    getAllDietOrders(): Promise<IMetricsResponse>;
    getDietOrders(token: string): Promise<IMetricsResponse>;
}
