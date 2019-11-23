import { injectable } from "inversify";
import { Schema } from "mongoose";
import { BaseRepository } from "../../../core/repository/BaseRepository";
import { IMeal } from "../model/Meal";
import { mealSchema } from "../model/MealSchema";
import { IMealRepository } from "./IMealRepository";

@injectable()
export class MealRepository extends BaseRepository<IMeal>
  implements IMealRepository {
  protected model: string = "Meal";
  protected schema: Schema<IMeal> = mealSchema;
}
