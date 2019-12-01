import { Document } from "mongoose";
import { IMeal } from "../../meal/model/Meal";

export interface IDailyMeals<T extends string | IMeal> extends Document {
  breakfast: T;
  morningSnack: T;
  lunch: T;
  afternoonSnack: T;
  dinner: T;
}
