import { IDailyDiet } from "../model/DailyDiet";

export interface IDailyDietService {
  getDailyDiets(date: string, dietId: string): Promise<IDailyDiet[]>;
  getDailyDietById(id: string): Promise<IDailyDiet>;
  addDailyDiet(dailyDietParams: any): Promise<IDailyDiet>;
  updateDailyDiet(id: string, dailyDietParams: any): Promise<IDailyDiet>;
}
