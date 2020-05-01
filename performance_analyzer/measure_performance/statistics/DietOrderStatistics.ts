import { RequestHelpers } from "./../../seed_database/RequestHelpers";
import { FalcorDietOrderRequests } from "../../requests/falcor/DietOrderRequests";
import { IDietOrder } from "../../generate_data/dietOrders/IDietOrder";
import { IDietOrderGenerator } from "../../generate_data/dietOrders/IDietOrderGenerator";
import { DietOrderGenerator } from "../../generate_data/dietOrders/DietOrderGenerator";
import { Operation, OperationDetails } from "../../types/OperationTypes";
import { StatisticsCalculator } from "../StatisticsCalculator.ts/StatisticsCalculator";
import { Tool } from "../../types/ToolTypes";
import { GraphQLDietOrderRequests } from "../../requests/graphql/DietOrderRequests";
import { RESTDietOrderRequests } from "../../requests/rest/DietOrderRequests";
import { ILogger } from "../StatsLogger/ILogger";
import { StatisticsBase } from "./StatisticsBase";
import { IDietOrderRequests } from "../../requests/IDietOrderRequests";
import { Response } from "got/dist/source";

const RANDOM_USER_ID: string = "5d468d80-8401-11ea-8460-ff758cca59e4";

export class DietOrderStatistics extends StatisticsBase {
    private _randomDietOrders: IDietOrder[];
    private _testUserToken: string;
    private _isInitiated: boolean;

    constructor(logger: ILogger, nrOfRepetition: number, dbSize: string) {
        const dietOrderGenerator: IDietOrderGenerator = new DietOrderGenerator();
        super(logger, nrOfRepetition, dbSize, dietOrderGenerator);
    }

    protected async getRESTStatistics(): Promise<void> {
        await this.init();
        const dietOrderRequests: IDietOrderRequests = await new RESTDietOrderRequests();
        await this.getAllDietOrdersMetrics(dietOrderRequests, Tool.REST);
        await this.getUserDietOrdersMetrics(dietOrderRequests, Tool.REST);
        const newDietOrdersIds: string[] = await this.addDietOrdersMetrics(
            dietOrderRequests, Tool.REST, (res: any) => res.message._id);
    }
    protected async getGraphQLStatistics(): Promise<void> {
        await this.init();
        const dietOrderRequests: IDietOrderRequests = await new GraphQLDietOrderRequests();
        await this.getAllDietOrdersMetrics(dietOrderRequests, Tool.GraphQL);
        await this.getUserDietOrdersMetrics(dietOrderRequests, Tool.GraphQL);
        const newDietOrdersIds: string[] = await this.addDietOrdersMetrics(
            dietOrderRequests,
            Tool.GraphQL,
            (res: any) => res.data.addDietOrder._id);
    }
    protected async getFalcorStatistics(): Promise<void> {
        await this.init();
        const dietOrderRequests: IDietOrderRequests = await new FalcorDietOrderRequests();
        await this.getAllDietOrdersMetrics(dietOrderRequests, Tool.Falcor);
        await this.getUserDietOrdersMetrics(dietOrderRequests, Tool.Falcor);
        const newDietOrdersIds: string[] = await this.addDietOrdersMetrics(
            dietOrderRequests,
            Tool.Falcor,
            (res: any) => res.jsonGraph.dietOrder._id);   
    }

    private async getAllDietOrdersMetrics(dietOrderRequests: IDietOrderRequests, tool: Tool): Promise<void> {
        let i = 0;
        const statisticsCalculator = new StatisticsCalculator() ;
        while (i < this.numberOfRepetitions) {
            const response: Response<string> = await dietOrderRequests.getAllDietOrders();
            statisticsCalculator.recalculateStatistics(response);
            i += 1;
        }
        this.writeStatistics(
            "dietOrders", tool, Operation.GET, OperationDetails.GET_ALL, statisticsCalculator.getMedianStatistics());
    }

    private async getUserDietOrdersMetrics(dietOrderRequests: IDietOrderRequests, tool: Tool): Promise<void> {
        let i = 0;
        const statisticsCalculator = new StatisticsCalculator() ;
        while (i < this.numberOfRepetitions) {
            const response: Response<string> = await dietOrderRequests.getDietOrders(this._testUserToken);
            statisticsCalculator.recalculateStatistics(response);
            i += 1;
        }
        this.writeStatistics(
            "dietOrders", tool, Operation.GET, "GET user's diet orders", statisticsCalculator.getMedianStatistics());
    }

    private async addDietOrdersMetrics(
        dietOrderRequests: IDietOrderRequests, tool: Tool, getIdFromRes: (res: any) => string): Promise<any> {
        const dietOrderIds: string[] = [];
        const statisticsCalculator = new StatisticsCalculator();
        for (const dietOrder of this._randomDietOrders) {
            const response: Response<string> = await dietOrderRequests.addDietOrder(dietOrder, this._testUserToken);
            statisticsCalculator.recalculateStatistics(response);
            dietOrderIds.push(getIdFromRes(JSON.parse(response.body)));
        }
        this.writeStatistics(
            "dietOrders", tool, Operation.ADD, OperationDetails.NONE, statisticsCalculator.getMedianStatistics());
        return dietOrderIds;
    }

    private async generateRandomDietOrders(dietIds: string[], kcalOptions: number[]): Promise<IDietOrder[]> {
        const dietOrders: IDietOrder[] = [];
        let i = 0;
        while (i < this.numberOfRepetitions) {
            const dietOrder: IDietOrder = 
                (this.dataGenerator as IDietOrderGenerator)
                    .generateRandomDietOrder(dietIds, kcalOptions, RANDOM_USER_ID);
            dietOrders.push(dietOrder);
            i += 1;
        }
        return dietOrders;
    }

    private async init(): Promise<void> {
        if (this._isInitiated) {
            return;
        } else {
            const dietIds: string[] = await RequestHelpers.getAllDietIds();
            const kcalOptions: number[] = await RequestHelpers.getKcalOptions();
            this._randomDietOrders = await this.generateRandomDietOrders(dietIds, kcalOptions);
            this._testUserToken = await RequestHelpers.getTestUserToken();
            this._isInitiated = true;
        }
    }
}
