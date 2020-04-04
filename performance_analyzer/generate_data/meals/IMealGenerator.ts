import { IMeal } from "./IMeal";

export interface IMealGenerator {
    generateRandomMeal(productIds: string[]): IMeal;
}
