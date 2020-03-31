import { IMetricsResponse } from "../types/IMetricsResponsee";
export interface IAuthRequests {
    login(): Promise<IMetricsResponse>;
}
