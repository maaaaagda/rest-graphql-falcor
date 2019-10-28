import { Document } from "mongoose";
import OrderStatus from "./OrderStatus";

export interface IDietOrder extends Document {
    name: string;
    dates: string [];
    status: OrderStatus
}
