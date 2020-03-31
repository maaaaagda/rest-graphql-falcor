import { GraphQLUserRequests } from "./../../requests/graphql/UserRequests";
import { IMetricsResponse } from "./../../types/IMetricsResponsee";
import { RESTUserRequests } from "./../../requests/rest/UserRequests";
import { ILogger } from "../StatsLogger/ILogger";
import { StatisticsBase } from "../StatisticsBase";
import { IUserRequests } from "../../requests/IUserRequests";

export class UserStatistics extends StatisticsBase {
    
    constructor(logger: ILogger, nrOfRepetition: number, dbSize: string) {
        super(logger, nrOfRepetition, dbSize);
    }

    protected async getRESTStatistics(): Promise<void> {
        const userRequests: IUserRequests = await new RESTUserRequests();
        const response: IMetricsResponse = await userRequests.getAllUsers();
        this.writeStatistics("REST", "GET", "getAll", response);
    }
    protected async getGraphQLStatistics(): Promise<void> {
        const userRequests: IUserRequests = await new GraphQLUserRequests();
        const response: IMetricsResponse = await userRequests.getAllUsers();
        this.writeStatistics("GraphQL", "GET", "getAll", response);
    }
    protected async getFalcorStatistics(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
