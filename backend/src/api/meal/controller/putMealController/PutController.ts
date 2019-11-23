import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IAuthenticator } from "../../../../core/auth/IAuthenticator";
import { IValidator } from "../../../../core/validator/IValidator";
import { TYPES } from "../../../../ioc/types";
import { SuccessResponse } from "../../../../response/SuccessResponse";
import { MEAL_TYPES } from "../../ioc/MealTypes";
import { IMeal } from "../../model/Meal";
import { mealPutSchema } from "../../schema/put/putMeal";
import { IPutMealController } from "./IPutController";
import { IMealService } from "../../service/IMealService";

@injectable()
export class PutMealController implements IPutMealController {
  @inject(MEAL_TYPES.IMealService)
  private readonly _mealService: IMealService;

  @inject(TYPES.IAuthenticator)
  private readonly _authenticator: IAuthenticator;

  @inject(TYPES.IValidator)
  private readonly _validator: IValidator;

  public async process(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      this._authenticator.authenticate(req.headers.authorization);
      this._validator.validate(req.body, mealPutSchema);
      const updatedMeal: IMeal = await this._mealService.putMeal(
        req.query.id,
        req.body
      );
      return res.json(SuccessResponse.Ok(updatedMeal));
    } catch (error) {
      return new Promise(() => {
        next(error);
      });
    }
  }
}
