import { Cleaner } from "./../clear_database/Cleaner";
import { Seeder } from "./../seed_database/Seeder";
import { MealStatistics } from "./statistics/MealStatistics";
import { ProductStatistics } from "./statistics/ProductStatistics";
import { DietStatistics } from "./statistics/DietStatistics";
import { DatabaseSize } from "./../types/DatabaseSizeTypes";
import { UserStatistics } from "./statistics/UserStatistics";
import { Logger } from "./StatsLogger/Logger";
const NUMBER_OF_REPETITION = 30;

async function getPerformanceData() {
    const dateTime: string = new Date().toISOString().replace(/:/g, "-").substring(0, 19);
    const logger = new Logger(`C:\\Users\\magda\\pwr\\Dyplom\\eksperyment\\stats_${dateTime}.csv`);
    try {
        for ( const dbSize of Object.values(DatabaseSize)) {
            await new Seeder().seed(dbSize);
            await new UserStatistics(logger, NUMBER_OF_REPETITION, dbSize).getStatistics();
            await new DietStatistics(logger, NUMBER_OF_REPETITION, dbSize).getStatistics();
            await new ProductStatistics(logger, NUMBER_OF_REPETITION, dbSize).getStatistics();
            await new MealStatistics(logger, NUMBER_OF_REPETITION, dbSize).getStatistics();
            await new Cleaner().clean();
        }
    } catch (err) {
        console.log(err);
        console.log(err?.response?.body);
    }

}

getPerformanceData();
