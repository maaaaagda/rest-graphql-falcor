import { inject, injectable } from "inversify";
import { MEAL_REPOSITORIES } from "../ioc/MealTypes";
import { IMealRepository } from "../repository/IMealRepository";
import { IMeal } from "../model/Meal";
import { BadRequestError } from "../../../core/error/BadRequestError";
import { PRODUCT_REPOSITORIES } from "../../product/ioc/ProductTypes";
import { IProductRepository } from "../../product/repository/IProductRepository";
import { IProduct, NutritionValues } from "../../product/model/Product";
import { Ingredient } from "../model/Ingredient";
import _ from "lodash";

@injectable()
export class MealService {
  @inject(MEAL_REPOSITORIES.IMealRepository)
  private readonly _mealRepository: IMealRepository;

  @inject(PRODUCT_REPOSITORIES.IProductRepository)
  private readonly _productRepository: IProductRepository;

  public async getMeals(): Promise<IMeal[]> {
    return await this._mealRepository.getMeals();
  }

  public async getMealById(id: string): Promise<IMeal[]> {
    return await this._mealRepository.getMeal(id);
  }

  public async removeMeal(id: string): Promise<IMeal> {
    return await this._mealRepository.removeOneById(id);
  }

  public async postMeal(mealParams: IMeal, authorId: string) {
    const { ingredients } = mealParams;
    mealParams.authorId = authorId;
    const productIds = Array.from(
      new Set(ingredients.map((ingredient) => ingredient.productId))
    );
    const products = await this._productRepository.getManyByIds(productIds);
    if (productIds.length && products.length !== productIds.length) {
      throw new BadRequestError(
        "Property productId is improper for at least one ingredient"
      );
    }

    const mealNutritionValues:
      | NutritionValues
      | {} = this.getNutritionValueForMeal(ingredients, products);

    return await this._mealRepository.insertOne(
      Object.assign({}, mealParams, mealNutritionValues)
    );
  }

  public async putMeal(id: string, mealParams: IMeal) {
    const mealToModify: IMeal = await this._mealRepository.getOne({
      _id: id
    });
    if (mealToModify) {
      const ingredients = mealParams.ingredients || ([] as Ingredient[]);
      const productIds = Array.from(
        new Set(ingredients.map((ingredient) => ingredient.productId))
      );
      const products = await this._productRepository.getManyByIds(productIds);
      if (productIds.length && products.length !== productIds.length) {
        throw new BadRequestError(
          "Property productId is improper for at least one ingredient"
        );
      }

      const mealNutritionValues:
        | NutritionValues
        | {} = this.getNutritionValueForMeal(ingredients, products);

      const toUpdate = Object.assign(
        {},
        JSON.parse(JSON.stringify(mealParams)),
        mealNutritionValues
      );

      const updated: IMeal = await this._mealRepository.updateOneById(id, {
        $set: toUpdate
      });
      return updated;
    }
    throw new BadRequestError();
  }

  private countNutritionValueForMeal(
    ingredients: Array<Ingredient & IProduct>,
    nutritionName: string
  ): number {
    return (
      _.meanBy(
        ingredients,
        (ingredient) => ingredient.weight * ingredient[nutritionName]
      ) / _.sumBy(ingredients, "weight") || 0
    );
  }

  private getNutritionValueForMeal(
    ingredients: Ingredient[],
    products: IProduct[]
  ): NutritionValues | {} {
    if (ingredients.length && products.length) {
      const parsedIngredients: Array<Ingredient & IProduct> = ingredients.map(
        (ingredient, id) =>
          Object.assign(
            {},
            ingredient,
            JSON.parse(JSON.stringify(products[id]))
          )
      );

      return {
        kcal: this.countNutritionValueForMeal(parsedIngredients, "kcal"),
        protein: this.countNutritionValueForMeal(parsedIngredients, "protein"),
        carbohydrate: this.countNutritionValueForMeal(
          parsedIngredients,
          "carbohydrate"
        ),
        fat: this.countNutritionValueForMeal(parsedIngredients, "fat"),
        fibre: this.countNutritionValueForMeal(parsedIngredients, "fibre")
      };
    }
    return {};
  }
}
