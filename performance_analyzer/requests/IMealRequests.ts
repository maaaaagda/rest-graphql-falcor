import { Response } from "got";
import { IMeal } from "../generate_data/meals/IMeal";
export interface IMealRequests {
    getMeals(nrOfMeals?: number): Promise<Response<string>>;
    getMealById(id: string): Promise<Response<string>>;
    addMeal(meal: IMeal): Promise<Response<string>>;
    updateMeal(id: string, meal: IMeal): Promise<Response<string>>;
}
