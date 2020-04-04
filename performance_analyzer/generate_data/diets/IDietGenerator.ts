import { IDiet } from "./IDiet";

export interface IDietGenerator {
    generateRandomDiet(): IDiet;
}
