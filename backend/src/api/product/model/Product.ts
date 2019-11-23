import { Document } from "mongoose";
import { Entity } from "../../../core/database/Entity";

export interface IProduct extends Document, Entity {
  _id: string;
  name: string;
  kcal: number;
  protein: number;
  carbohydrate: number;
  fat: number;
  fibre: number;
  photo: string;
}
