import { IMetricsResponse } from "../types/Response";
export interface IAuthRequests {
    login(): Promise<IMetricsResponse>;
}
