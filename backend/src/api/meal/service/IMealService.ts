import { IMeal } from "../model/Meal";

export interface IMealService {
  getMeals(): Promise<IMeal[]>;
  getMealById(id: string): Promise<IMeal>;
  postMeal(mealParams: any): Promise<IMeal>;
  putMeal(id: string, mealParams: any): Promise<IMeal>;
}
