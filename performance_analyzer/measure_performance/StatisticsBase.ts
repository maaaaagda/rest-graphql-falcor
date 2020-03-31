import { IMetricsResponse } from "../types/IMetricsResponsee";
import { ILogger } from "./StatsLogger/ILogger";

export abstract class StatisticsBase {
    protected numberOfRepetitions: number;
    protected logger: ILogger;
    protected dbSize: string;

    constructor(logger: ILogger, nrOfRepetition: number, dbSize: string) {
        this.logger = logger;
        this.numberOfRepetitions = nrOfRepetition;
        this.dbSize = dbSize;
    }
    
    public getStatistics(): void {
        this.getRESTStatistics();
        this.getGraphQLStatistics();
        this.getFalcorStatistics();
    }

    protected abstract getRESTStatistics(): void;
    protected abstract getGraphQLStatistics(): void;
    protected abstract getFalcorStatistics(): void;
    protected writeStatistics(tool: string, operation: string,
                              operationDetails: string, statistics: IMetricsResponse) {
        this.logger.log(
            this.dbSize, tool, "users", operation, operationDetails, statistics.size, statistics.timings.firstByte);
    }
}
