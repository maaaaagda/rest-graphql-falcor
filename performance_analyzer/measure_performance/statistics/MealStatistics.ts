import { RESTProductRequests } from "./../../requests/rest/ProductRequests";
import { FalcorMealRequests } from "../../requests/falcor/MealRequests";
import { IMeal } from "../../generate_data/meals/IMeal";
import { IMealGenerator } from "../../generate_data/meals/IMealGenerator";
import { MealGenerator } from "../../generate_data/meals/MealGenerator";
import { Operation, OperationDetails } from "../../types/OperationTypes";
import { StatisticsCalculator } from "../StatisticsCalculator.ts/StatisticsCalculator";
import { Tool } from "../../types/ToolTypes";
import { GraphQLMealRequests } from "../../requests/graphql/MealRequests";
import { RESTMealRequests } from "../../requests/rest/MealRequests";
import { ILogger } from "../StatsLogger/ILogger";
import { StatisticsBase } from "./StatisticsBase";
import { IMealRequests } from "../../requests/IMealRequests";
import { Response } from "got/dist/source";

export class MealStatistics extends StatisticsBase {
    private _randomMeals: IMeal[];

    constructor(logger: ILogger, nrOfRepetition: number, dbSize: string) {
        const mealGenerator: IMealGenerator = new MealGenerator();
        super(logger, nrOfRepetition, dbSize, mealGenerator);
        this.generateRandomMeals();
    }

    protected async getRESTStatistics(): Promise<void> {
        const mealRequests: IMealRequests = await new RESTMealRequests();
        await this.getMealsMetrics(mealRequests, Tool.REST);
        const newMealsIds: string[] = await this.addMealsMetrics(
            mealRequests, Tool.REST, (res: any) => res.message._id);
        this.updateMealsMetrics(mealRequests, Tool.REST, newMealsIds);
    }
    protected async getGraphQLStatistics(): Promise<void> {
        const mealRequests: IMealRequests = await new GraphQLMealRequests();
        await this.getMealsMetrics(mealRequests, Tool.GraphQL);
        const newMealsIds: string[] = await this.addMealsMetrics(
            mealRequests,
            Tool.GraphQL,
            (res: any) => res.data.addMeal._id);
        this.updateMealsMetrics(mealRequests, Tool.GraphQL, newMealsIds);
    }
    protected async getFalcorStatistics(): Promise<void> {
        const mealRequests: IMealRequests = await new FalcorMealRequests();
        const nrOfMeals = await this.getNrOfAllMeals();
        await this.getMealsMetrics(mealRequests, Tool.Falcor, nrOfMeals);
        const newMealsIds: string[] = await this.addMealsMetrics(
            mealRequests,
            Tool.Falcor,
            (res: any) => res.jsonGraph.meal._id);   
        this.updateMealsMetrics(mealRequests, Tool.Falcor, newMealsIds);
    }

    private async getMealsMetrics(mealRequests: IMealRequests, tool: Tool, nrOfMeals?: number): Promise<void> {
        let i = 0;
        const statisticsCalculator = new StatisticsCalculator() ;
        while (i < this.numberOfRepetitions) {
            const response: Response<string> = await mealRequests.getMeals(nrOfMeals);
            statisticsCalculator.recalculateStatistics(response);
            i += 1;
        }
        this.writeStatistics(
            "meals", tool, Operation.GET, OperationDetails.GET_ALL, statisticsCalculator.getAverageStatistics());
    }

    private async addMealsMetrics(
        mealRequests: IMealRequests, tool: Tool, getIdFromRes: (res: any) => string): Promise<any> {
        const mealIds: string[] = [];
        const statisticsCalculator = new StatisticsCalculator();
        for (const meal of this._randomMeals) {
            const response: Response<string> = await mealRequests.addMeal(meal);
            statisticsCalculator.recalculateStatistics(response);
            mealIds.push(getIdFromRes(JSON.parse(response.body)));
        }
        this.writeStatistics(
            "meals", tool, Operation.ADD, OperationDetails.NONE, statisticsCalculator.getAverageStatistics());
        return mealIds;
    }

    private async updateMealsMetrics(
        mealRequests: IMealRequests, tool: Tool, mealIdsToUpdate: string[]): Promise<any> {
        const mealIds: string[] = [];
        const statisticsCalculator = new StatisticsCalculator();
        let i: number = 0;
        while (i < this.numberOfRepetitions) {
            const meal: any = this._randomMeals[this.numberOfRepetitions - i - 1];
            const response: Response<string> = await mealRequests.updateMeal(
                mealIdsToUpdate[i],
                meal);
            statisticsCalculator.recalculateStatistics(response);
            i += 1;
        }
        this.writeStatistics(
            "meals", tool, Operation.UPDATE, OperationDetails.NONE, statisticsCalculator.getAverageStatistics());
        return mealIds;
    }

    private async generateRandomMeals(): Promise<void> {
        const productIds: string[] = await this.getAllProductIds();
        const meals: IMeal[] = [];
        let i = 0;
        while (i < this.numberOfRepetitions) {
            const meal: IMeal = (this.dataGenerator as IMealGenerator).generateRandomMeal(productIds);
            meals.push(meal);
            i += 1;
        }
        this._randomMeals = meals;
    }

    private async getNrOfAllMeals(): Promise<number> {
        const mealRequests: IMealRequests = await new GraphQLMealRequests();
        const response: Response<string> = await mealRequests.getMeals();
        return JSON.parse(response.body).data.meals.length;
    }

    private async getAllProductIds(): Promise<string[]> {
        const res: Response<string> = await new RESTProductRequests().getProducts("");
        return JSON.parse(res.body).message.map((product) => product._id);    
    }
}
