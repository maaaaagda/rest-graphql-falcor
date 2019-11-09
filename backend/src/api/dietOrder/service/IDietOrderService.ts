import { IDietOrder } from "../model/DietOrder";

export interface IDietOrderService {
  getDietOrders(): Promise<IDietOrder[]>;
  postDietOrder(dietParams: any): Promise<IDietOrder>;
  putDietOrder(id: string, dietParams: any): Promise<IDietOrder>;
}
