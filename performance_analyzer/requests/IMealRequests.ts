import { Response } from "got";
export interface IMealRequests {
    getMeals(): Promise<Response<string>>;
    getMealById(id: string): Promise<Response<string>>;
}
