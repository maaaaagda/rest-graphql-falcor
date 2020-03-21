import mongoose from "mongoose";
import uuidv1 from "uuid/v1";

export const productSchema: mongoose.Schema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv1
  },
  name: {
    type: String,
    required: true
  },
  kcal: {
    type: Number
  },
  protein: {
    type: Number
  },
  carbohydrate: {
    type: Number
  },
  fat: {
    type: Number
  },
  fibre: {
    type: Number
  },
  photo: {
    type: Buffer
  }
});
