import { IMetricsResponse } from "../types/IMetricsResponsee";
export interface IProductRequests {
    getProducts(name?: string): Promise<IMetricsResponse>;
}
