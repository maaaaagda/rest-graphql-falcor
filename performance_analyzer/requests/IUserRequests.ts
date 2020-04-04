import { IMetricsResponse } from "../types/IMetricsResponsee";
import { Response } from "got";

export interface IUserRequests {
    getAllUsers(): Promise<Response<string>>;
    addUser(user): Promise<Response<string>>;
}
