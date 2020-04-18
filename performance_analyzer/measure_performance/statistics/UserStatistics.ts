import { FalcorUserRequests } from "../../requests/falcor/UserRequests";
import { IUser } from "../../generate_data/users/IUser";
import { IUserGenerator } from "../../generate_data/users/IUserGenerator";
import { UserGenerator } from "../../generate_data/users/UserGenerator";
import { Operation, OperationDetails } from "../../types/OperationTypes";
import { StatisticsCalculator } from "../StatisticsCalculator.ts/StatisticsCalculator";
import { Tool } from "../../types/ToolTypes";
import { GraphQLUserRequests } from "../../requests/graphql/UserRequests";
import { RESTUserRequests } from "../../requests/rest/UserRequests";
import { ILogger } from "../StatsLogger/ILogger";
import { StatisticsBase } from "./StatisticsBase";
import { IUserRequests } from "../../requests/IUserRequests";
import { Response } from "got/dist/source";

export class UserStatistics extends StatisticsBase {
    private readonly _randomUsers: IUser[];

    constructor(logger: ILogger, nrOfRepetition: number, dbSize: string) {
        const userGenerator: IUserGenerator = new UserGenerator();
        super(logger, nrOfRepetition, dbSize, userGenerator);
        this._randomUsers = this.generateRandomUsers();
    }

    protected async getRESTStatistics(): Promise<void> {
        const userRequests: IUserRequests = await new RESTUserRequests();
        await this.getAllUsersMetrics(userRequests, Tool.REST);
        await this.addUsersMetrics(userRequests, Tool.REST, (res: Response<string>) => "");
    }
    protected async getGraphQLStatistics(): Promise<void> {
        const userRequests: IUserRequests = await new GraphQLUserRequests();
        await this.getAllUsersMetrics(userRequests, Tool.GraphQL);
        await this.addUsersMetrics(userRequests, Tool.GraphQL, (res: Response<string>) => "");

    }
    protected async getFalcorStatistics(): Promise<void> {
        const userRequests: IUserRequests = await new FalcorUserRequests();
        await this.getAllUsersMetrics(userRequests, Tool.Falcor);
        await this.addUsersMetrics(userRequests, Tool.Falcor, (res: Response<string>) => "");    }

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

    private async addUsersMetrics(
        userRequests: IUserRequests, tool: Tool, getIdFromRes: (res: Response<string>) => string): Promise<string[]> {
        const userIds: string[] = [];
        const statisticsCalculator = new StatisticsCalculator();
        for (const user of this._randomUsers) {
            const response: Response<string> = await userRequests.addUser(user);
            statisticsCalculator.recalculateStatistics(response);
            userIds.push(getIdFromRes(response));
        }
        this.writeStatistics(
            "users", tool, Operation.ADD, OperationDetails.NONE, statisticsCalculator.getAverageStatistics());
        return userIds;
    }

    private generateRandomUsers(): IUser[] {
        const users: IUser[] = [];
        let i = 0;
        while (i < this.numberOfRepetitions) {
            const user: IUser = (this.dataGenerator as IUserGenerator).generateRandomUser();
            users.push(user);
            i += 1;
        }
        return users;
    }
}
