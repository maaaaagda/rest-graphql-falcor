import { Response } from "got/dist/source";
import { IDiet } from "../generate_data/diets/IDiet";
export interface IDietRequests {
    getAllDiets(nrOfDiets?: number): Promise<Response<string>>;
    getDietById(id: string): Promise<Response<string>>;
    addDiet(diet: IDiet): Promise<Response<string>>;
    updateDiet(id: string, diet: IDiet): Promise<Response<string>>;
}
