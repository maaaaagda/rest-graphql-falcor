import { Document } from "mongoose";
import OrderStatus from "./OrderStatus";
import { Entity } from "../../../core/database/Entity";

export interface IDietOrder extends Document, Entity {
    id: string;
    name: string;
    dates: string [];
    status: OrderStatus;
}
