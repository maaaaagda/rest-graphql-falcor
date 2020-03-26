import { getAllDiets } from "./diets";
import { generateDailyDiet } from "./../../generate_data/dailyDiets";
import { initialMetricsResponse, recalculateMetrics } from "../helpers";
import { API_URL } from "../../common";
import got from "../got";
import { getMeals } from "./meals";

const NR_OF_MS_IN_A_DAY: number = 86400000;

export const addDailyDiets = async (nrOfDietDays: number) => {
    const options = {
        url: API_URL + "daily-diets",
        method: "POST",
        body: ""
    };
    let i: number = 0;
    let metrics = initialMetricsResponse;
    const nextDateGeneratorInstance = nextDateGenerator();
    const mealIds =  (await getMeals()).data.map((meal) => meal._id);
    const dietIds = (await getAllDiets()).data.map((diet) => diet._id);
    
    while (i < nrOfDietDays) {
        const date = nextDateGeneratorInstance.next().value as string;
        for (const dietId of dietIds) {
            options.body = JSON.stringify(generateDailyDiet(date, dietId, mealIds));
            metrics = recalculateMetrics(metrics, await got(options));
        }
        i = i + 1;
    }
  
    return metrics;
};

function *nextDateGenerator() {
    let currentDateMs = new Date().getTime();
    while (true) {
        currentDateMs += NR_OF_MS_IN_A_DAY;
        const currentDate = new Date(currentDateMs).toISOString();

        yield currentDate.slice(0, 10);
    }
}
