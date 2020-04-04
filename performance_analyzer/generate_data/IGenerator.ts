import { IMealGenerator } from "./meals/IMealGenerator";
import { IUserGenerator } from "./users/IUserGenerator";

export type IGenerator = IUserGenerator | IMealGenerator;
