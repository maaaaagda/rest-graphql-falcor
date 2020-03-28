import { generateRandomDietOrder } from "./../../generate_data/dietOrder";
import { getAllUsers } from "./users";
import { getKcalOptions, getAllDiets } from "./diets";
import { initialMetricsResponse, recalculateMetrics } from "../helpers";
import { API_URL } from "../../common";
import got from "../got";

const MAX_NR_OF_ORDERS_PER_PERSON = 3;

export const addDietOrders = async () => {
    const options = {
        url: API_URL + "diet-orders",
        method: "POST",
        body: ""
    };
    let metrics = initialMetricsResponse;
    const kcalOptions = (await getKcalOptions()).data.map((kcalOption) => kcalOption.value);
    const userIds = (await getAllUsers()).data.map((user) => user._id);
    const dietIds = (await getAllDiets()).data.map((diet) => diet._id);    
    for (const userId of userIds) {
        const nrOfOrders = Math.ceil(Math.random() * MAX_NR_OF_ORDERS_PER_PERSON);
        let i = 0;
        while (i < nrOfOrders) {
            options.body = JSON.stringify(generateRandomDietOrder(dietIds, kcalOptions, userId));
            metrics = recalculateMetrics(metrics, await got(options));
            i += 1;
        }
    }
  
    return metrics;
};
