import { Operation, OperationDetails } from "./../types/OperationTypes";
import { Tool } from "./../types/ToolTypes";
import { IStatistics } from "./../types/IStatistics";
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
    
    public async getStatistics(): Promise<void> {
       await this.getRESTStatistics();
       await this.getGraphQLStatistics();
       await this.getFalcorStatistics();
    }

    protected async abstract getRESTStatistics(): Promise<void>;
    protected async abstract getGraphQLStatistics(): Promise<void>;
    protected async abstract getFalcorStatistics(): Promise<void>;
    protected async writeStatistics(collection: string, tool: Tool, operation: Operation, 
                                    operationDetails: OperationDetails, statistics: IStatistics) {
        this.logger.log(
            this.dbSize, tool, collection, operation, operationDetails, statistics.size, statistics.firstByte);
    }
}
