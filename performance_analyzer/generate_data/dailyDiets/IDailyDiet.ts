import { IMeal } from "../meals/IMeal";

export interface IDailyDiet {
    dietId: string;
    date: string;
    dailyMeals: {
        breakfast: string,
        morningSnack: string,
        lunch: string,
        afternoonSnack: string,
        dinner: string
    };
}
