import { inject, injectable } from "inversify";
import { DAILY_DIET_REPOSITORIES } from "../ioc/DailyDietTypes";
import { IDailyDietRepository } from "../repository/IDailyDietRepository";
import { IDailyDiet } from "../model/DailyDiet";
import { BadRequestError } from "../../../core/error/BadRequestError";
import { MEAL_REPOSITORIES } from "../../meal/ioc/MealTypes";
import { IMealRepository } from "../../meal/repository/IMealRepository";
import { DIET_REPOSITORIES } from "../../diet/ioc/DietTypes";
import { IDietRepository } from "../../diet/repository/IDietRepository";

@injectable()
export class DailyDietService {
  @inject(DAILY_DIET_REPOSITORIES.IDailyDietRepository)
  private readonly _dailyDietRepository: IDailyDietRepository;

  @inject(MEAL_REPOSITORIES.IMealRepository)
  private readonly _mealRepository: IMealRepository;

  @inject(DIET_REPOSITORIES.IDietRepository)
  private readonly _dietRepository: IDietRepository;

  public async getDailyDiets(
    date: string,
    dietId: string
  ): Promise<IDailyDiet[]> {
    return await this._dailyDietRepository.getDailyDiets(date, dietId);
  }

  public async getDailyDietById(id: string): Promise<IDailyDiet> {
    return (await this._dailyDietRepository.getDailyDietById(id))[0];
  }

  public async addDailyDiet(dailyDietParams: IDailyDiet) {
    await this.checkDailyDietParams(dailyDietParams);
    return await this._dailyDietRepository.insertOne(dailyDietParams);
  }

  public async updateDailyDiet(id: string, dailyDietParams: IDailyDiet) {
    const dailyDietToModify: IDailyDiet = await this._dailyDietRepository.getOne(
      {
        _id: id
      }
    );
    if (dailyDietToModify) {
      await this.checkDailyDietParams(dailyDietParams);
      const updated: IDailyDiet = await this._dailyDietRepository.updateOneById(
        id,
        {
          $set: dailyDietParams
        }
      );
      return updated;
    }
    throw new BadRequestError();
  }

  private async checkDailyDietParams(dailyDietParams: IDailyDiet) {
    const { dietId, dailyMeals } = dailyDietParams;
    const dietExists: boolean =
      (await this._dietRepository.getCountByIds([dietId])) > 0;
    if (!dietExists) {
      throw new BadRequestError("Wrong dietId provided");
    }
    const allMealsExist: boolean =
      (await this._mealRepository.getCountByIds(
        (Object as any).values(dailyMeals)
      )) == (Object as any).keys(dailyMeals).length;

    if (!allMealsExist) {
      throw new BadRequestError("Provided wrong or duplicated meals ids ");
    }
    return Promise.resolve(true);
  }
}
