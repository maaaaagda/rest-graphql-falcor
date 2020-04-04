import { IDailyDietGenerator } from "./IDailyDietGenerator";
const NR_OF_MEALS_IN_A_DAY = 5;

export class DailyDietGenerator implements IDailyDietGenerator {
    public generateDailyDiet = (date: string, dietId: string, mealIds: string[]) => {
        const meals: string[] = this.getRandomMealIds(mealIds);
        return {
            dietId,
            date,
            dailyMeals: {
                breakfast: meals.shift(),
                morningSnack: meals.shift(),
                lunch: meals.shift(),
                afternoonSnack: meals.shift(),
                dinner: meals.shift()
            }
        };
    }

    private getRandomMealIds(mealIds: string[]): string[] {
        const ids = new Set();
        while (ids.size < NR_OF_MEALS_IN_A_DAY) {
            ids.add(mealIds[Math.floor(Math.random() * mealIds.length)]);
        }
        return Array.from(ids) as string[];
    }
}
