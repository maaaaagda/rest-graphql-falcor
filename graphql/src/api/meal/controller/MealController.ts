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
import { UserInputError } from "apollo-server-express";
import getContainer from "./../ioc/inversify.config";

export class MealController {
  private readonly _container: Container = getContainer();

  private readonly _mealService: IMealService = this._container.get(
    MEAL_TYPES.IMealService);

  private readonly _authenticator: IAuthenticator = this._container.get(
    TYPES.IAuthenticator
  );

  private readonly _validator: IValidator = this._container.get(TYPES.IValidator);

  public readonly getMeals = async (parent, args, ctx: Context, info): Promise<IMeal[]> => {
    this._authenticator.authenticate(ctx.token);
    const meals: IMeal[] = await this._mealService.getMeals();
    return meals;
  }

  public readonly getMealById = async (parent, args: { mealId: string}, ctx: Context, info): Promise<IMeal> => {
    this._authenticator.authenticate(ctx.token);  
    const meal: IMeal = (await this._mealService.getMealById(args.mealId))[0];
    if (!meal) {
        throw new UserInputError("Meal with given id does not exist");
    }
    return meal;
  }

  public readonly removeMeal = async (parent, args: { id: string}, ctx: Context, info): Promise<boolean> => {
    this._authenticator.authenticate(ctx.token);  
    await this._mealService.removeMeal(args.id);
    return true;
  }
  
  public readonly addMeal = async (parent, args: { meal: IMeal }, ctx: Context, info): Promise<IMeal> => {
    const { userId } = this._authenticator.authenticate(ctx.token, UserRole.DIETITIAN);
    this._validator.validate(args.meal, mealAddSchema);
    const meal: IMeal = await this._mealService.addMeal(args.meal, userId);
    return meal;
  }

  public readonly updateMeal 
  = async (parent, args: { id: string, meal: IMeal }, ctx: Context, info): Promise<IMeal> => {
    this._authenticator.authenticate(
        ctx.token,
        UserRole.DIETITIAN
    );
    this._validator.validate(args.meal, mealUpdateSchema);
    const updatedMeal: IMeal = await this._mealService.updateMeal(
        args.id,
        args.meal
    );
    return updatedMeal;
  }
}
