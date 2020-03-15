import { Schema } from "mongoose";

export const Ingredient = new Schema(
  {
    productId: String,
    weight: Number
  },
  { _id: false }
);
