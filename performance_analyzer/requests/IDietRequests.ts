import { IMetricsResponse } from "./../types/Response";
export interface IDietRequests {
    getAllDiets(): Promise<IMetricsResponse>;
    getDietById(id: string): Promise<IMetricsResponse>;
}
