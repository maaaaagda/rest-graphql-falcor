import { Cleaner } from "./../clear_database/Cleaner";
import { Seeder } from "./../seed_database/Seeder";
import { MealStatistics } from "./statistics/MealStatistics";
import { ProductStatistics } from "./statistics/ProductStatistics";
import { DietStatistics } from "./statistics/DietStatistics";
import { DatabaseSize } from "./../types/DatabaseSizeTypes";
import { UserStatistics } from "./statistics/UserStatistics";
import { Logger } from "./StatsLogger/Logger";
const NUMBER_OF_REPETITION = 30;

const databaseSizes: DatabaseSize[] = [DatabaseSize.SMALL];

async function getPerformanceData() {
    const logger = new Logger("C:\\Users\\magda\\pwr\\Dyplom\\eksperyment\\stats.csv");
    try {
        for ( const dbSize of databaseSizes) {
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
