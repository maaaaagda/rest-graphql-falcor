import { IDietGenerator } from "./diets/IDietGenerator";
import { IDietOrderGenerator } from "./dietOrders/IDietOrderGenerator";
import { IMealGenerator } from "./meals/IMealGenerator";
import { IUserGenerator } from "./users/IUserGenerator";

export type IGenerator = IUserGenerator | IMealGenerator | IDietOrderGenerator | IDietGenerator;
