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

  public async getMeals() {
    const model = await this.getModel();
    return model.aggregate(productNameAggregation);
  }
  public async getMeal(id: string) {
    const model = await this.getModel();

    return model.aggregate([
      {
        $match: { _id: id }
      },
      ...productNameAggregation
    ]);
  }
}

const productNameAggregation = [
  { $unwind: "$ingredients" },
  {
    $lookup: {
      from: "products",
      localField: "ingredients.productId",
      foreignField: "_id",
      as: "ingredients.productName"
    }
  },
  { $unwind: "$ingredients.productName" },
  {
    $project: {
      "ingredients.productName": "$ingredients.productName.name",
      "ingredients.productId": 1,
      "ingredients.weight": 1,
      name: 1,
      recipe: 1,
      kcal: 1,
      protein: 1,
      carbohydrate: 1,
      fat: 1,
      fibre: 1,
      photo: 1,
      authorId: 1
    }
  }
];
