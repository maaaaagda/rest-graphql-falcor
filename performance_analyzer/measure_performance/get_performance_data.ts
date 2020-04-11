import { MealStatistics } from "./statistics/MealStatistics";
import { ProductStatistics } from "./statistics/ProductStatistics";
import { DietStatistics } from "./statistics/DietStatistics";
import { DatabaseSize } from "./../types/DatabaseSizeTypes";
import { UserStatistics } from "./statistics/UserStatistics";
import { Logger } from "./StatsLogger/Logger";
const NUMBER_OF_REPETITION = 30;

async function getPerformanceData() {
    const logger = new Logger("C:\\Users\\magda\\pwr\\Dyplom\\eksperyment\\stats.csv");
    try {
            // await new UserStatistics(logger, NUMBER_OF_REPETITION, DatabaseSize.MEDIUM).getStatistics();
        // await new DietStatistics(logger, NUMBER_OF_REPETITION, DatabaseSize.MEDIUM).getStatistics();
        // await new ProductStatistics(logger, NUMBER_OF_REPETITION, DatabaseSize.MEDIUM).getStatistics();
        await new MealStatistics(logger, NUMBER_OF_REPETITION, DatabaseSize.MEDIUM).getStatistics();
    } catch (err) {
        console.log(err);
        console.log(err?.response?.body);
    }

}

getPerformanceData();
