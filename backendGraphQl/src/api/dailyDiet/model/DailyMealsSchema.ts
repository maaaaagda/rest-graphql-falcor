import { Schema } from "mongoose";

export const DailyMeals = new Schema(
  {
    breakfast: String,
    morningSnack: String,
    lunch: String,
    afternoonSnack: String,
    dinner: String
  },
  { _id: false }
);
