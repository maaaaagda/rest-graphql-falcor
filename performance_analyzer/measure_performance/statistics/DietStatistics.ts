import { FalcorDietRequests } from "../../requests/falcor/DietRequests";
import { IDiet } from "../../generate_data/diets/IDiet";
import { IDietGenerator } from "../../generate_data/diets/IDietGenerator";
import { DietGenerator } from "../../generate_data/diets/DietGenerator";
import { Operation, OperationDetails } from "../../types/OperationTypes";
import { StatisticsCalculator } from "../StatisticsCalculator.ts/StatisticsCalculator";
import { Tool } from "../../types/ToolTypes";
import { GraphQLDietRequests } from "../../requests/graphql/DietRequests";
import { RESTDietRequests } from "../../requests/rest/DietRequests";
import { ILogger } from "../StatsLogger/ILogger";
import { StatisticsBase } from "./StatisticsBase";
import { IDietRequests } from "../../requests/IDietRequests";
import { Response } from "got/dist/source";

export class DietStatistics extends StatisticsBase {
    private readonly _randomDiets: IDiet[];

    constructor(logger: ILogger, nrOfRepetition: number, dbSize: string) {
        const dietGenerator: IDietGenerator = new DietGenerator();
        super(logger, nrOfRepetition, dbSize, dietGenerator);
        this._randomDiets = this.generateRandomDiets();
    }

    protected async getRESTStatistics(): Promise<void> {
        const dietRequests: IDietRequests = await new RESTDietRequests();
        await this.getAllDietsMetrics(dietRequests, Tool.REST);
        const newDietsIds: string[] = await this.addDietsMetrics(
            dietRequests, Tool.REST, (res: any) => res.message._id);
        this.updateDietsMetrics(dietRequests, Tool.REST, newDietsIds);
    }
    protected async getGraphQLStatistics(): Promise<void> {
        const dietRequests: IDietRequests = await new GraphQLDietRequests();
        await this.getAllDietsMetrics(dietRequests, Tool.GraphQL);
        const newDietsIds: string[] = await this.addDietsMetrics(
            dietRequests,
            Tool.GraphQL,
            (res: any) => res.data.addDiet._id);
        this.updateDietsMetrics(dietRequests, Tool.GraphQL, newDietsIds);
    }
    protected async getFalcorStatistics(): Promise<void> {
        const dietRequests: IDietRequests = await new FalcorDietRequests();
        const nrOfDiets = await this.getNrOfAllDiets();
        await this.getAllDietsMetrics(dietRequests, Tool.Falcor, nrOfDiets);
        const newDietsIds: string[] = await this.addDietsMetrics(
            dietRequests,
            Tool.Falcor,
            (res: any) => res.jsonGraph.diet._id);   
        this.updateDietsMetrics(dietRequests, Tool.Falcor, newDietsIds);
    }

    private async getAllDietsMetrics(dietRequests: IDietRequests, tool: Tool, nrOfDiets?: number): Promise<void> {
        let i = 0;
        const statisticsCalculator = new StatisticsCalculator() ;
        while (i < this.numberOfRepetitions) {
            const response: Response<string> = await dietRequests.getAllDiets(nrOfDiets);
            statisticsCalculator.recalculateStatistics(response);
            i += 1;
        }
        this.writeStatistics(
            "diets", tool, Operation.GET, OperationDetails.GET_ALL, statisticsCalculator.getAverageStatistics());
    }

    private async addDietsMetrics(
        dietRequests: IDietRequests, tool: Tool, getIdFromRes: (res: any) => string): Promise<any> {
        const dietIds: string[] = [];
        const statisticsCalculator = new StatisticsCalculator();
        for (const diet of this._randomDiets) {
            const response: Response<string> = await dietRequests.addDiet(diet);
            statisticsCalculator.recalculateStatistics(response);
            dietIds.push(getIdFromRes(JSON.parse(response.body)));
        }
        this.writeStatistics(
            "diets", tool, Operation.ADD, OperationDetails.NONE, statisticsCalculator.getAverageStatistics());
        return dietIds;
    }

    private async updateDietsMetrics(
        dietRequests: IDietRequests, tool: Tool, dietIdsToUpdate: string[]): Promise<any> {
        const dietIds: string[] = [];
        const statisticsCalculator = new StatisticsCalculator();
        let i: number = 0;
        while (i < this.numberOfRepetitions) {
            const diet: any = this._randomDiets[this.numberOfRepetitions - i - 1];
            const response: Response<string> = await dietRequests.updateDiet(
                dietIdsToUpdate[i],
                diet);
            statisticsCalculator.recalculateStatistics(response);
            i += 1;
        }
        this.writeStatistics(
            "diets", tool, Operation.UPDATE, OperationDetails.NONE, statisticsCalculator.getAverageStatistics());
        return dietIds;
    }

    private generateRandomDiets(): IDiet[] {
        const diets: IDiet[] = [];
        let i = 0;
        while (i < this.numberOfRepetitions) {
            const diet: IDiet = (this.dataGenerator as IDietGenerator).generateRandomDiet();
            diets.push(diet);
            i += 1;
        }
        return diets;
    }

    private async getNrOfAllDiets(): Promise<number> {
        const dietRequests: IDietRequests = await new GraphQLDietRequests();
        const response: Response<string> = await dietRequests.getAllDiets();
        return JSON.parse(response.body).data.diets.length;
    }
}
