import { IIngredient } from "./IIngredient";
export interface IMeal {
    name: string;
    ingredients: IIngredient[];
    recipe: string;
    photoUrl: string;
}
