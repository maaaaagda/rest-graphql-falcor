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
  { $unwind: { path: "$ingredients", preserveNullAndEmptyArrays: true } },
  {
    $lookup: {
      from: "products",
      localField: "ingredients.productId",
      foreignField: "_id",
      as: "products"
    }
  },
  { $unwind: { path: "$products", preserveNullAndEmptyArrays: true } },
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
  },
  {
    $project: {
      _id: 1,
      name: 1,
      recipe: 1,
      kcal: 1,
      protein: 1,
      carbohydrate: 1,
      fat: 1,
      fibre: 1,
      photo: 1,
      authorId: 1,
      ingredients: {
        $cond: {
          if: {
            $and: [{ $eq: ["$ingredients", [{}]] }]
          },
          then: [],
          else: "$ingredients"
        }
      }
    }
  }
];
