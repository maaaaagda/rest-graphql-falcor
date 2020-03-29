import { IMetricsResponse } from "./../types/Response";
export interface IProductRequests {
    getProducts(name?: string): Promise<IMetricsResponse>;
}
