import { IBaseRepository } from "../../../core/repository/IBaseRepository";
import { IDailyDiet } from "../model/DailyDiet";

export interface IDailyDietRepository extends IBaseRepository<IDailyDiet> {
  getDailyDiets(date: string, dietId: string): Promise<IDailyDiet[]>;
  getDailyDietById(id?: string): Promise<IDailyDiet[]>;
  getDailyDietByDate(id?: string): Promise<IDailyDiet[]>;
}
