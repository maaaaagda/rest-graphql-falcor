import { IDiet } from "../model/Diet";

export interface IDietService {
  getDiets(): Promise<IDiet[]>;
  getDietById(id: string): Promise<IDiet>;
  addDiet(dietParams: any): Promise<IDiet>;
  updateDiet(id: string, dietParams: any): Promise<IDiet>;
}
