import { Document } from "mongoose";
import OrderStatus from "./OrderStatus";

export interface IDietOrder extends Document {
    id: string,
    name: string;
    dates: string [];
    status: OrderStatus
}
