import { IMeal } from "../model/Meal";

export interface IMealService {
  getMeals(): Promise<IMeal[]>;
  getMealById(id: string): Promise<IMeal[]>;
  postMeal(mealParams: any, authorId: string): Promise<IMeal>;
  putMeal(id: string, mealParams: any): Promise<IMeal>;
}
