import { IMetricsResponse } from "./../types/Response";

export interface IDietOrderRequests {
    getAllDietOrders(): Promise<IMetricsResponse>;
    getDietOrders(token: string): Promise<IMetricsResponse>;
}
