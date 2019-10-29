import mongoose from "mongoose";
import OrderStatus from "./OrderStatus";

export const dietOrderSchema: mongoose.Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dates: {
      type: [{type: Date}],
    },
    status: {
      type: String,
      enum: [...Object.values(OrderStatus)],
      default: OrderStatus.IN_REALISATION,
    }
  });
