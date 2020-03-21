import { Document } from "mongoose";
import { Entity } from "../../../core/database/Entity";
import { OrderStatus } from "./OrderStatus";

export interface IDietOrder<T extends string | Date> extends Document, Entity {
  _id: string;
  dietId: string;
  customerId: string;
  dates: T[];
  cost?: number;
  kcal: number;
  deliveryAddress: string;
  deliveryTime: string;
  status: OrderStatus;
}
