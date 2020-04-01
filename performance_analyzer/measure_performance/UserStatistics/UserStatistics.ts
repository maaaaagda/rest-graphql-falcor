import { Operation, OperationDetails } from "./../../types/OperationTypes";
import { StatisticsCalculator } from "./../statistics/StatisticsCalculator";
import { Tool } from "./../../types/ToolTypes";
import { GraphQLUserRequests } from "./../../requests/graphql/UserRequests";
import { RESTUserRequests } from "./../../requests/rest/UserRequests";
import { ILogger } from "../StatsLogger/ILogger";
import { StatisticsBase } from "../StatisticsBase";
import { IUserRequests } from "../../requests/IUserRequests";
import { Response } from "got/dist/source";

export class UserStatistics extends StatisticsBase {
    
    constructor(logger: ILogger, nrOfRepetition: number, dbSize: string) {
        super(logger, nrOfRepetition, dbSize);
    }

    protected async getRESTStatistics(): Promise<void> {
        const userRequests: IUserRequests = await new RESTUserRequests();
        this.getAllUsersMetrics(userRequests, Tool.REST);
    }
    protected async getGraphQLStatistics(): Promise<void> {
        const userRequests: IUserRequests = await new GraphQLUserRequests();
        this.getAllUsersMetrics(userRequests, Tool.GraphQL);

    }
    protected async getFalcorStatistics(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    private async getAllUsersMetrics(userRequests: IUserRequests, tool: Tool): Promise<void> {
        let i = 0;
        const statisticsCalculator = new StatisticsCalculator() ;
        while (i < this.numberOfRepetitions) {
            const response: Response<string> = await userRequests.getAllUsers();
            statisticsCalculator.recalculateStatistics(response);
            i += 1;
        }
        this.writeStatistics(
            "users", tool, Operation.GET, OperationDetails.GET_ALL, statisticsCalculator.getAverageStatistics());
    }
}
