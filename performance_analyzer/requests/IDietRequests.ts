import { IMetricsResponse } from "../types/IMetricsResponsee";
import { Response } from "got/dist/source";
export interface IDietRequests {
    getAllDiets(): Promise<Response<string>>;
    getDietById(id: string): Promise<Response>;
}
