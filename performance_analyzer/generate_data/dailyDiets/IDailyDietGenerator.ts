import { IDailyDiet } from "./IDailyDiet";
export interface IDailyDietGenerator {
    generateDailyDiet(date: string, dietId: string, mealIds: string[]): IDailyDiet;
}
