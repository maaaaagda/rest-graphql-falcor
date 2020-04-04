import mongoose from "mongoose";
import uuidv1 from "uuid/v1";
import { DailyMeals } from "./DailyMealsSchema";

export const dailyDietSchema: mongoose.Schema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv1
  },
  date: {
    type: Date,
    required: true
  },
  dietId: {
    type: String,
    required: true
  },
  dailyMeals: {
    type: DailyMeals,
    required: true
  }
});
