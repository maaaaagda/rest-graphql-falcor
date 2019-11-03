import { Document } from "mongoose";
import { Entity } from "../../../core/database/Entity";

export interface IDiet extends Document, Entity {
  id: string;
  name: string;
  dailyCost: number;
}
