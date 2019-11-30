import { IDailyDiet } from "../model/DailyDiet";

export interface IDailyDietService {
  getDailyDiets(): Promise<IDailyDiet[]>;
  getDailyDietById(id: string): Promise<IDailyDiet>;
  postDailyDiet(dailyDietParams: any): Promise<IDailyDiet>;
  putDailyDiet(id: string, dailyDietParams: any): Promise<IDailyDiet>;
}
