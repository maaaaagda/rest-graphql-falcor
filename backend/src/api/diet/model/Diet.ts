import { Document } from "mongoose";
import { Entity } from "../../../core/database/Entity";

export interface IDiet extends Document, Entity {
  _id: string;
  name: string;
  dailyCost: number;
  photoUrl: string;
}
