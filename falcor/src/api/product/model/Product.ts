import { Document } from "mongoose";
import { Entity } from "../../../core/database/Entity";

export interface IProduct extends Document, Entity, NutritionValues {
  _id: string;
  name: string;
  photo: string;
}

export interface NutritionValues {
  kcal: number;
  protein: number;
  carbohydrate: number;
  fat: number;
  fibre: number;
}
