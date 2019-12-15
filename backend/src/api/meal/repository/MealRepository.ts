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
      as: "products"
    }
  },
  { $unwind: "$products" },
  {
    $group: {
      _id: "$_id",
      name: { $first: "$name" },
      recipe: { $first: "$recipe" },
      kcal: { $first: "$kcal" },
      protein: { $first: "$protein" },
      carbohydrate: { $first: "$carbohydrate" },
      fat: { $first: "$fat" },
      fibre: { $first: "$fibre" },
      photo: { $first: "$photo" },
      authorId: { $first: "$authorId" },
      ingredients: {
        $push: {
          _id: "$ingredients.productId",
          productName: "$products.name",
          weight: "$ingredients.weight"
        }
      }
    }
  }
];
