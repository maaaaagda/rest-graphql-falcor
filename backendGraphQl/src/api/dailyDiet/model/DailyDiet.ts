import { Document } from "mongoose";
import { Entity } from "../../../core/database/Entity";
import { IDailyMeals } from "./DailyMeals";

export interface IDailyDiet extends Document, Entity {
  _id: string;
  date: string;
  dietId: string;
  dailyMeals: IDailyMeals<string>;
}
