import { FalcorProductRequests } from "../../requests/falcor/ProductRequests";
import { Operation } from "../../types/OperationTypes";
import { StatisticsCalculator } from "../StatisticsCalculator.ts/StatisticsCalculator";
import { Tool } from "../../types/ToolTypes";
import { GraphQLProductRequests } from "../../requests/graphql/ProductRequests";
import { RESTProductRequests } from "../../requests/rest/ProductRequests";
import { ILogger } from "../StatsLogger/ILogger";
import { StatisticsBase } from "./StatisticsBase";
import { IProductRequests } from "../../requests/IProductRequests";
import { Response } from "got/dist/source";

export class ProductStatistics extends StatisticsBase {

    private readonly _productSearches: string[] = ["", "a", "app", "apple"];

    constructor(logger: ILogger, nrOfRepetition: number, dbSize: string) {
        super(logger, nrOfRepetition, dbSize, null);
    }

    protected async getRESTStatistics(): Promise<void> {
        const productRequests: IProductRequests = await new RESTProductRequests();
        await this.getProductsMetrics(productRequests, Tool.REST);
    }

    protected async getGraphQLStatistics(): Promise<void> {
        const productRequests: IProductRequests = await new GraphQLProductRequests();
        await this.getProductsMetrics(productRequests, Tool.GraphQL);

    }
    protected async getFalcorStatistics(): Promise<void> {
        const productRequests: IProductRequests = await new FalcorProductRequests();
        await this.getProductsMetrics(productRequests, Tool.Falcor);
    }

    private async getProductsMetrics(productRequests: IProductRequests, tool: Tool): Promise<void> {
        for (const search of this._productSearches) {
            let i = 0;
            const statisticsCalculator = new StatisticsCalculator() ;

            while (i < this.numberOfRepetitions) {
                const response: Response<string> = await productRequests.getProducts(search);
                statisticsCalculator.recalculateStatistics(response);
                i += 1;
            }
            this.writeStatistics(
                "products", 
                tool,
                Operation.GET,
                `Searched phrase: ${search}`,
                statisticsCalculator.getAverageStatistics());    
        }
    }
}
