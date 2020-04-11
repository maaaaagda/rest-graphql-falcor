import { IMeal } from "../model/Meal";

export interface IMealService {
  getMeals(): Promise<IMeal[]>;
  getMealById(id: string): Promise<IMeal[]>;
  addMeal(mealParams: any, authorId: string): Promise<IMeal>;
  updateMeal(id: string, mealParams: any): Promise<IMeal>;
  removeMeal(id: string): Promise<IMeal>;
}
