import mongoose from "mongoose";
import uuidv1 from "uuid/v1";
import { OrderStatus } from "./OrderStatus";

export const dietOrderSchema: mongoose.Schema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      default: uuidv1(),
    },
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
    },
  });
