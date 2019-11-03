import { Document } from "mongoose";
import { Entity } from "../../../core/database/Entity";
import { OrderStatus } from "./OrderStatus";

export interface IDietOrder extends Document, Entity {
  _id: string;
  diet: string;
  dates: string[];
  status: OrderStatus;
}
