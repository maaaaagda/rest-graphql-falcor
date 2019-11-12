import { IDiet } from "../model/Diet";

export interface IDietService {
  getDiets(): Promise<IDiet[]>;
  postDiet(dietParams: any): Promise<IDiet>;
  putDiet(id: string, dietParams: any): Promise<IDiet>;
}
