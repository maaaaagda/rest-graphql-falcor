import { BadRequestError } from "./../../../core/error/BadRequestError";
import { MEAL_TYPES } from "./../ioc/MealTypes";
import { mealAddSchema } from "./../schema/addMeal";
import { UserRole } from "./../../user/model/UserRole";
import { IMeal } from "./../model/Meal";
import { IValidator } from "./../../../core/validator/IValidator";
import { IAuthenticator } from "./../../../core/auth/IAuthenticator";
import { IMealService } from "./../service/IMealService";
import { Container, inject } from "inversify";
import { Context } from "vm";
import { TYPES } from "../../../ioc/types";
import { mealUpdateSchema } from "../schema/updateMeal";
import getContainer from "./../ioc/inversify.config";

export class MealController {
  private readonly _container: Container = getContainer();

  private readonly _mealService: IMealService = this._container.get(
    MEAL_TYPES.IMealService);

  private readonly _authenticator: IAuthenticator = this._container.get(
    TYPES.IAuthenticator
  );

  private readonly _validator: IValidator = this._container.get(TYPES.IValidator);

  public readonly getMeals = async (): Promise<IMeal[]> => {
    const meals: IMeal[] = await this._mealService.getMeals();
    return meals;
  }

  public readonly getMealById = async (mealId: string): Promise<IMeal> => {
    const meal: IMeal = (await this._mealService.getMealById(mealId))[0];
    if (!meal) {
        throw new BadRequestError("Meal with given id does not exist");
    }
    return meal;
  }
  
  // public readonly addMeal = async ( meal: IMeal ): Promise<IMeal> => {
  //   const { userId } = this._authenticator.authenticate(ctx.token, UserRole.DIETITIAN);
  //   this._validator.validate(meal, mealAddSchema);
  //   const meal: IMeal = await this._mealService.addMeal(args.meal, userId);
  //   return meal;
  // }

  public readonly updateMeal = async ( id: string, meal: IMeal ): Promise<IMeal> => {
    // this._authenticator.authenticate(
    //     ctx.token,
    //     UserRole.DIETITIAN
    // );
    this._validator.validate(meal, mealUpdateSchema);
    const updatedMeal: IMeal = await this._mealService.updateMeal(
        id,
        meal
    );
    return updatedMeal;
  }
}
