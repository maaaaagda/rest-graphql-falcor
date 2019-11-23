import { inject, injectable } from "inversify";
import { MEAL_REPOSITORIES } from "../ioc/MealTypes";
import { IMealRepository } from "../repository/IMealRepository";
import { IMeal } from "../model/Meal";
import { BadRequestError } from "../../../core/error/BadRequestError";
import { PRODUCT_REPOSITORIES } from "../../product/ioc/ProductTypes";
import { IProductRepository } from "../../product/repository/IProductRepository";

@injectable()
export class MealService {
  @inject(MEAL_REPOSITORIES.IMealRepository)
  private readonly _mealRepository: IMealRepository;

  @inject(PRODUCT_REPOSITORIES.IProductRepository)
  private readonly _productRepository: IProductRepository;

  public async getMeals(): Promise<IMeal[]> {
    return await this._mealRepository.getMany();
  }

  public async postMeal(mealParams: IMeal) {
    const { ingredients } = mealParams;
    const productIds = Array.from(
      new Set(ingredients.map(ingredient => ingredient.productId))
    );
    const productDBIdsCount = await this._productRepository.getCountByIds(
      productIds
    );
    if (productDBIdsCount !== productIds.length) {
      throw new BadRequestError(
        "Property productId is improper for at least one ingredient"
      );
    }
    return await this._mealRepository.insertOne(mealParams);
  }

  public async putMeal(id: string, mealParams: IMeal) {
    const mealToModify: IMeal = await this._mealRepository.getOne({
      _id: id
    });
    if (mealToModify) {
      const updated: IMeal = await this._mealRepository.updateOneById(id, {
        $set: mealParams
      });
      return updated;
    }
    throw new BadRequestError();
  }
}
