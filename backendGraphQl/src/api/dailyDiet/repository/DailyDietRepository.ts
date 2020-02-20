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

  public async getDailyDiets(date: string, dietId: string) {
    const model = await this.getModel();
    const aggregations: any[] = [...mealsAggregation];
    if (date) {
      aggregations.unshift({
        $match: { date: { $eq: new Date(date) } }
      });
    }
    if (dietId) {
      aggregations.unshift({ $match: { dietId } });
    }

    return model.aggregate(aggregations);
  }
  public async getDailyDietById(id: string) {
    const model = await this.getModel();
    return model.aggregate([{ $match: { _id: id } }, ...mealsAggregation]);
  }

  public async getDailyDietByDate(date: string) {
    const model = await this.getModel();
    return model.aggregate([{ $match: { date } }, ...mealsAggregation]);
  }
}

const mealsAggregation = [
  {
    $lookup: {
      from: "meals",
      localField: "dailyMeals.breakfast",
      foreignField: "_id",
      as: "dailyMeals.breakfast"
    }
  },
  { $unwind: "$dailyMeals.breakfast" },
  {
    $lookup: {
      from: "meals",
      localField: "dailyMeals.morningSnack",
      foreignField: "_id",
      as: "dailyMeals.morningSnack"
    }
  },
  { $unwind: "$dailyMeals.morningSnack" },
  {
    $lookup: {
      from: "meals",
      localField: "dailyMeals.lunch",
      foreignField: "_id",
      as: "dailyMeals.lunch"
    }
  },
  { $unwind: "$dailyMeals.lunch" },
  {
    $lookup: {
      from: "meals",
      localField: "dailyMeals.afternoonSnack",
      foreignField: "_id",
      as: "dailyMeals.afternoonSnack"
    }
  },
  { $unwind: "$dailyMeals.afternoonSnack" },
  {
    $lookup: {
      from: "meals",
      localField: "dailyMeals.dinner",
      foreignField: "_id",
      as: "dailyMeals.dinner"
    }
  },
  { $unwind: "$dailyMeals.dinner" }
];
