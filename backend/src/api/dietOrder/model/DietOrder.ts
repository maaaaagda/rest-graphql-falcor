import { Document } from "mongoose";
import { Entity } from "../../../core/database/Entity";
import { OrderStatus } from "./OrderStatus";

export interface IDietOrder extends Document, Entity {
    id: string;
    name: string;
    dates: string [];
    status: OrderStatus;
}
