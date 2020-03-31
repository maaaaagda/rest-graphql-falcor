import { UserStatistics } from "./UserStatistics/UserStatistics";
import { Logger } from "./StatsLogger/Logger";
const NUMBER_OF_REPETITION = 30;

async function getPerformanceData() {
    const logger = new Logger("C:\\Users\\magda\\pwr\\Dyplom\\eksperyment\\stats.csv");

    new UserStatistics(logger, NUMBER_OF_REPETITION, "medium").getStatistics();
}

getPerformanceData();
