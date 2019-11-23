import { inject, injectable } from "inversify";
import { MEAL_REPOSITORIES } from "../ioc/MealTypes";
import { IMealRepository } from "../repository/IMealRepository";
import { IMeal } from "../model/Meal";
import { BadRequestError } from "../../../core/error/BadRequestError";

@injectable()
export class MealService {
  @inject(MEAL_REPOSITORIES.IMealRepository)
  private readonly _mealRepository: IMealRepository;

  public async getMeals(): Promise<IMeal[]> {
    return await this._mealRepository.getMany();
  }

  public async postMeal(mealParams: IMeal) {
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
