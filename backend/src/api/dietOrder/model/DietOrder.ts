import { Document } from "mongoose";
import { Entity } from "../../../core/database/Entity";
import { OrderStatus } from "./OrderStatus";

export interface IDietOrder extends Document, Entity {
  _id: string;
  dietId: string;
  customerId: string;
  dates: string[];
  kcal: number;
  cost: number;
  status: OrderStatus;
}
