import { IDailyDietRequests } from "../IDailyDietRequests";
import { initialIMetricsResponse, recalculateMetrics } from "../helpers";
import { API_URL } from "../../common";
import got from "../got";

export class DailyDietRequests implements IDailyDietRequests {
    
    public getDailyDiet = async (date: string, dietId: string) => {
        const options = {
            url: `${API_URL}daily-diets?date=${date}&dietId=${dietId}`
        };
        let metrics = initialIMetricsResponse;
        metrics = recalculateMetrics(metrics, await got(options), true);
        return metrics;
    }
}
