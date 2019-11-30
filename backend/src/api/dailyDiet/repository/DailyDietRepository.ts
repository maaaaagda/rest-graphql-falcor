import { injectable } from "inversify";
import { Schema } from "mongoose";
import { BaseRepository } from "../../../core/repository/BaseRepository";
import { IDailyDiet } from "../model/DailyDiet";
import { dailyDietSchema } from "../model/DailyDietSchema";
import { IDailyDietRepository } from "./IDailyDietRepository";

@injectable()
export class DailyDietRepository extends BaseRepository<IDailyDiet>
  implements IDailyDietRepository {
  protected model: string = "DailyDiet";
  protected schema: Schema<IDailyDiet> = dailyDietSchema;
}
