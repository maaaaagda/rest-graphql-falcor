import { IDietOrder } from "../model/DietOrder";

export interface IDietOrderService {
  getDietOrders(userId: string): Promise<IDietOrder[]>;
  getAllDietOrders(): Promise<IDietOrder[]>;
  addDietOrder(dietParams: any, userId: string): Promise<IDietOrder>;
  updateDietOrder(id: string, dietParams: any): Promise<IDietOrder>;
  getDietOrderCost(nrOfDays: number, kcal: number, dietId: string): number;
}
