import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IAuthenticator } from "../../../../core/auth/IAuthenticator";
import { IValidator } from "../../../../core/validator/IValidator";
import { TYPES } from "../../../../ioc/types";
import { SuccessResponse } from "../../../../response/SuccessResponse";
import { MEAL_TYPES } from "../../ioc/MealTypes";
import { IMeal } from "../../model/Meal";
import { mealPostSchema } from "../../schema/post/postMeal";
import { IPostMealController } from "./IPostController";
import { IMealService } from "../../service/IMealService";

@injectable()
export class PostMealController implements IPostMealController {
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
      this._validator.validate(req.body, mealPostSchema);
      const meal: IMeal = await this._mealService.postMeal(req.body);
      return res.json(SuccessResponse.Created(meal));
    } catch (error) {
      return new Promise(() => {
        next(error);
      });
    }
  }
}
