import { IMetricsResponse } from "../types/Response";

export interface IUserRequests {
    getAllUsers(): Promise<IMetricsResponse>;
}
