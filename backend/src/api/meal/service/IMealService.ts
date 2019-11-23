import { IMeal } from "../model/Meal";

export interface IMealService {
  getMeals(): Promise<IMeal[]>;
  postMeal(mealParams: any): Promise<IMeal>;
  putMeal(id: string, mealParams: any): Promise<IMeal>;
}
