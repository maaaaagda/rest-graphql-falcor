import { IMetricsResponse } from "../types/IMetricsResponsee";

export interface IUserRequests {
    getAllUsers(): Promise<IMetricsResponse>;
    // addUser(): Promise<IMetricsResponse>;
}
