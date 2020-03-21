import { Document } from "mongoose";
import { Entity } from "../../../core/database/Entity";
import { Ingredient } from "./Ingredient";

export interface IMeal extends Document, Entity {
  _id: string;
  name: string;
  ingredients: [Ingredient];
  recipe: string;
  rating: number;
  authorId: string;
  kcal: number;
  protein: number;
  carbohydrate: number;
  fat: number;
  fibre: number;
  photo: string;
}
