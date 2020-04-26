import mongoose from "mongoose";
import uuidv1 from "uuid/v1";
import { OrderStatus } from "./OrderStatus";

export const dietOrderSchema: mongoose.Schema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv1
  },
  dietId: {
    type: String,
    ref: "DietOrder",
    required: true
  },
  customerId: {
    type: String,
    ref: "User"
  },
  dates: {
    type: [{ type: Date }]
  },
  deliveryAddress: {
    type: String
  },
  deliveryTime: {
    type: String
  },
  kcal: {
    type: Number,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: [...Object.values(OrderStatus)],
    default: OrderStatus.IN_REALISATION
  }
});
