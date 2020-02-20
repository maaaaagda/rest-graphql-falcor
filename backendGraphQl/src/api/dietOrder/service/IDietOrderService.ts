import { IDietOrder } from "../model/DietOrder";

export interface IDietOrderService {
  getDietOrders(userId: string): Promise<IDietOrder[]>;
  getAllDietOrders(): Promise<IDietOrder[]>;
  postDietOrder(dietParams: any, userId: string): Promise<IDietOrder>;
  putDietOrder(id: string, dietParams: any): Promise<IDietOrder>;
  getDietOrderCost(nrOfDays: number, kcal: number, dietId: string): number;
}
