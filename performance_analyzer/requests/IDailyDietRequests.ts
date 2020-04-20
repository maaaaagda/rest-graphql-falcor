import { IDailyDiet } from "./../generate_data/dailyDiets/IDailyDiet";
import { Response } from "got";

export interface IDailyDietRequests {
    getDailyDiets(date: string, dietId: string): Promise<Response<string>>;
    addDailyDiet(dailyDiet: IDailyDiet): Promise<Response<string>>;
    updateDailyDiet(id: string, dailyDiet: IDailyDiet): Promise<Response<string>>;
}
