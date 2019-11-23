import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { SuccessResponse } from "../../../../response/SuccessResponse";
import { MEAL_TYPES } from "../../ioc/MealTypes";
import { IMeal } from "../../model/Meal";
import { IGetMealController } from "./IGetController";
import { IMealService } from "../../service/IMealService";

@injectable()
export class GetMealController implements IGetMealController {
  @inject(MEAL_TYPES.IMealService)
  private readonly _mealService: IMealService;

  public async process(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const meals: IMeal[] = await this._mealService.getMeals();
      return res.json(SuccessResponse.Ok(meals));
    } catch (error) {
      return new Promise(() => {
        next(error);
      });
    }
  }
}
