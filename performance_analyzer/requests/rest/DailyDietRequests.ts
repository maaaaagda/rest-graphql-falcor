import { DietRequests } from "./DietRequests";
import { MealRequests } from "./MealRequests";
import { IDailyDietRequests } from "../IDailyDietRequests";
import { generateDailyDiet } from "../../generate_data/dailyDiets";
import { initialIMetricsResponse, recalculateMetrics } from "../helpers";
import { API_URL } from "../../common";
import got from "../got";

const NR_OF_MS_IN_A_DAY: number = 86400000;

export class DailyDietRequests implements IDailyDietRequests {
    public addDailyDiets = async (nrOfDietDays: number) => {
        const options = {
            url: API_URL + "daily-diets",
            method: "POST",
            body: ""
        };
        let i: number = 0;
        let metrics = initialIMetricsResponse;
        const nextDateGeneratorInstance = this.nextDateGenerator();
        const mealIds =  (await new MealRequests().getMeals()).data.map((meal) => meal._id);
        const dietIds = (await new DietRequests().getAllDiets()).data.map((diet) => diet._id);
        
        while (i < nrOfDietDays) {
            const date = nextDateGeneratorInstance.next().value as string;
            for (const dietId of dietIds) {
                options.body = JSON.stringify(generateDailyDiet(date, dietId, mealIds));
                metrics = recalculateMetrics(metrics, await got(options));
            }
            i = i + 1;
        }
      
        return metrics;
    }
    
    public getDailyDiet = async (date: string, dietId: string) => {
        const options = {
            url: `${API_URL}daily-diets?date=${date}&dietId=${dietId}`
        };
        let metrics = initialIMetricsResponse;
        metrics = recalculateMetrics(metrics, await got(options), true);
        return metrics;
    }
    
    private *nextDateGenerator() {
        let currentDateMs = new Date().getTime();
        while (true) {
            currentDateMs += NR_OF_MS_IN_A_DAY;
            const currentDate = new Date(currentDateMs).toISOString();
    
            yield currentDate.slice(0, 10);
        }
    }
}
