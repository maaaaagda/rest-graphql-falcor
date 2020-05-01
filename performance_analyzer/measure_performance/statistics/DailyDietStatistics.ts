import { RequestHelpers } from "./../../seed_database/RequestHelpers";
import { FalcorDailyDietRequests } from "../../requests/falcor/DailyDietRequests";
import { IDailyDiet } from "../../generate_data/dailyDiets/IDailyDiet";
import { IDailyDietGenerator } from "../../generate_data/dailyDiets/IDailyDietGenerator";
import { DailyDietGenerator } from "../../generate_data/dailyDiets/DailyDietGenerator";
import { Operation, OperationDetails } from "../../types/OperationTypes";
import { StatisticsCalculator } from "../StatisticsCalculator.ts/StatisticsCalculator";
import { Tool } from "../../types/ToolTypes";
import { GraphQLDailyDietRequests } from "../../requests/graphql/DailyDietRequests";
import { RESTDailyDietRequests } from "../../requests/rest/DailyDietRequests";
import { ILogger } from "../StatsLogger/ILogger";
import { StatisticsBase } from "./StatisticsBase";
import { IDailyDietRequests } from "../../requests/IDailyDietRequests";
import { Response } from "got/dist/source";

export class DailyDietStatistics extends StatisticsBase {
    private _randomDietId: string;
    private _randomDate: string;
    private _randomDailyDiets: IDailyDiet[];
    private _isInitiated: boolean;

    constructor(logger: ILogger, nrOfRepetition: number, dbSize: string) {
        const dailyDietGenerator: IDailyDietGenerator = new DailyDietGenerator();
        super(logger, nrOfRepetition, dbSize, dailyDietGenerator);
    }

    protected async getRESTStatistics(): Promise<void> {
        await this.init();
        const dailyDietRequests: IDailyDietRequests = await new RESTDailyDietRequests();
        await this.getDailyDietsMetricsForOneDiet(dailyDietRequests, Tool.REST);
        await this.getDailyDietsMetricsForAllDiets(dailyDietRequests, Tool.REST);
        const newDailyDietsIds: string[] = await this.addDailyDietsMetrics(
            dailyDietRequests, Tool.REST, (res: any) => res.message._id);
        await this.updateDailyDietsMetrics(dailyDietRequests, Tool.REST, newDailyDietsIds);
    }
    protected async getGraphQLStatistics(): Promise<void> {
        await this.init();
        const dailyDietRequests: IDailyDietRequests = await new GraphQLDailyDietRequests();
        await this.getDailyDietsMetricsForOneDiet(dailyDietRequests, Tool.GraphQL);
        await this.getDailyDietsMetricsForAllDiets(dailyDietRequests, Tool.GraphQL);
        const newDailyDietsIds: string[] = await this.addDailyDietsMetrics(
            dailyDietRequests,
            Tool.GraphQL,
            (res: any) => res.data.addDailyDiet._id);
        await this.updateDailyDietsMetrics(dailyDietRequests, Tool.GraphQL, newDailyDietsIds);
    }
    protected async getFalcorStatistics(): Promise<void> {
        await this.init();
        const dailyDietRequests: IDailyDietRequests = await new FalcorDailyDietRequests();
        await this.getDailyDietsMetricsForOneDiet(dailyDietRequests, Tool.Falcor);
        await this.getDailyDietsMetricsForAllDiets(dailyDietRequests, Tool.Falcor);
        const newDailyDietsIds: string[] = await this.addDailyDietsMetrics(
            dailyDietRequests,
            Tool.Falcor,
            (res: any) => res.jsonGraph.dailyDiet._id);   
        await this.updateDailyDietsMetrics(dailyDietRequests, Tool.Falcor, newDailyDietsIds);
    }

    private async getDailyDietsMetricsForOneDiet(dailyDietRequests: IDailyDietRequests, tool: Tool)
    : Promise<void> {
        let i = 0;
        const statisticsCalculator = new StatisticsCalculator() ;
        while (i < this.numberOfRepetitions) {
            const response: Response<string> 
                = await dailyDietRequests.getDailyDiets(
                    this._randomDate,
                    this._randomDietId);
            statisticsCalculator.recalculateStatistics(response);
            i += 1;
        }
        this.writeStatistics(
            "dailyDiets", tool, Operation.GET, "Get one diet for one day", statisticsCalculator.getMedianStatistics());
    }

    private async getDailyDietsMetricsForAllDiets(dailyDietRequests: IDailyDietRequests, tool: Tool)
    : Promise<void> {
        let i = 0;
        const statisticsCalculator = new StatisticsCalculator() ;
        while (i < this.numberOfRepetitions) {
            const response: Response<string> 
                = await dailyDietRequests.getDailyDiets(this._randomDate, "");
            statisticsCalculator.recalculateStatistics(response);
            i += 1;
        }
        this.writeStatistics(
            "dailyDiets",
            tool,
            Operation.GET,
            "Get all diets for one day",
            statisticsCalculator.getMedianStatistics());
    }

    private async addDailyDietsMetrics(
        dailyDietRequests: IDailyDietRequests, tool: Tool, getIdFromRes: (res: any) => string): Promise<any> {
        const dailyDietIds: string[] = [];
        const statisticsCalculator = new StatisticsCalculator();
        for (const dailyDiet of this._randomDailyDiets) {
            const response: Response<string> = await dailyDietRequests.addDailyDiet(dailyDiet);
            statisticsCalculator.recalculateStatistics(response);
            dailyDietIds.push(getIdFromRes(JSON.parse(response.body)));
        }
        this.writeStatistics(
            "dailyDiets", tool, Operation.ADD, OperationDetails.NONE, statisticsCalculator.getMedianStatistics());
        return dailyDietIds;
    }

    private async updateDailyDietsMetrics(
        dailyDietRequests: IDailyDietRequests, tool: Tool, dailyDietIdsToUpdate: string[]): Promise<any> {
        const dailyDietIds: string[] = [];
        const statisticsCalculator = new StatisticsCalculator();
        let i: number = 0;
        while (i < this.numberOfRepetitions) {
            const dailyDiet: any = this._randomDailyDiets[this.numberOfRepetitions - i - 1];
            const response: Response<string> = await dailyDietRequests.updateDailyDiet(
                dailyDietIdsToUpdate[i],
                dailyDiet);
            statisticsCalculator.recalculateStatistics(response);
            i += 1;
        }
        this.writeStatistics(
            "dailyDiets", tool, Operation.UPDATE, OperationDetails.NONE, statisticsCalculator.getMedianStatistics());
        return dailyDietIds;
    }

    private async init(): Promise<void> {
        if (this._isInitiated) {
            return;
        } else {
            const dietIds = await RequestHelpers.getAllDietIds();
            this._randomDate = RequestHelpers.nextDateGenerator().next().value as string;
            this._randomDietId = dietIds[Math.floor(Math.random() * dietIds.length)];
            this._randomDailyDiets = await this.generateRandomDailyDiets();
            this._isInitiated = true;
        }
    }

    private async generateRandomDailyDiets(): Promise<IDailyDiet[]> {
        const dailyDiets: IDailyDiet[] = [];
        let i = 0;
        const nextDateGeneratorInstance = RequestHelpers.nextDateGenerator();
        const mealIds = await RequestHelpers.getAllMealIds();

        while (i < this.numberOfRepetitions) {
            const date = nextDateGeneratorInstance.next().value as string;
            const dailyDiet: IDailyDiet = (this.dataGenerator as IDailyDietGenerator)
                .generateDailyDiet(date, this._randomDietId, mealIds);
            dailyDiets.push(dailyDiet);
            i += 1;
        }
        return dailyDiets;
    }
}
