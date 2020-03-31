import { IMetricsResponse } from "../types/IMetricsResponsee";
export interface IDietRequests {
    getAllDiets(): Promise<IMetricsResponse>;
    getDietById(id: string): Promise<IMetricsResponse>;
}
