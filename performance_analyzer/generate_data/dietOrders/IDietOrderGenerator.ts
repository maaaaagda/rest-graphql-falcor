import { IDietOrder } from "./IDietOrder";
export interface IDietOrderGenerator {
    generateRandomDietOrder(dietIds: string[], kcalOptions: number[], userId: string): IDietOrder;
}
