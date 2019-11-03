import mongoose from "mongoose";
import uuidv1 from "uuid/v1";

export const dietSchema: mongoose.Schema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    default: uuidv1()
  },
  name: {
    type: String,
    required: true
  },
  dailyCost: {
    type: Number,
    required: true
  }
});
