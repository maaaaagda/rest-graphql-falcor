import { NextFunction, Request, Response } from "express";
import { Container, inject } from "inversify";
import {
  controller,
  httpGet,
  httpPost,
  httpPut,
  interfaces,
  httpDelete
} from "inversify-express-utils";
import { TYPES } from "../../ioc/types";
import { MEAL_TYPES } from "./ioc/MealTypes";
import getContainer from "./ioc/inversify.config";
import { Config } from "../../config/Config";
import { IMeal } from "./model/Meal";
import { SuccessResponse } from "../../response/SuccessResponse";
import { IMealService } from "./service/IMealService";
import { mealPostSchema } from "./schema/post/postMeal";
import { mealPutSchema } from "./schema/put/putMeal";
import { IAuthenticator } from "../../core/auth/IAuthenticator";
import { IValidator } from "../../core/validator/IValidator";
import { BadRequestError } from "../../core/error/BadRequestError";
import { UserRole } from "../user/model/UserRole";

const config: Config = new Config();
const ENDPOINT: string = "meals";

@controller(`${config.API_PATH}${ENDPOINT}`)
export class MealController implements interfaces.Controller {
  private readonly _container: Container = getContainer();

  private readonly _mealService: IMealService = this._container.get<
    IMealService
  >(MEAL_TYPES.IMealService);

  @inject(TYPES.IAuthenticator)
  private readonly _authenticator: IAuthenticator;

  @inject(TYPES.IValidator)
  private readonly _validator: IValidator;

  @httpGet("/")
  public async getMeal(
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

  @httpGet("/:mealId")
  public async getMealById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      if (!req.params.mealId) {
        throw new BadRequestError(
          "Please provide valid mealId query parameter"
        );
      }
      const meal: IMeal = (
        await this._mealService.getMealById(req.params.mealId)
      )[0];
      if (!meal) {
        throw new BadRequestError("Meal with given id does not exist");
      }
      return res.json(SuccessResponse.Ok(meal));
    } catch (error) {
      return new Promise(() => {
        next(error);
      });
    }
  }

  @httpPost("/")
  public async postMeal(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { userId } = this._authenticator.authenticate(
        req.headers.authorization,
        UserRole.DIETITIAN
      );
      this._validator.validate(req.body, mealPostSchema);
      const meal: IMeal = await this._mealService.postMeal(req.body, userId);
      return res.json(SuccessResponse.Created(meal));
    } catch (error) {
      return new Promise(() => {
        next(error);
      });
    }
  }

  @httpDelete("/:mealId")
  public async deleteMeal(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      this._authenticator.authenticate(
        req.headers.authorization,
        UserRole.DIETITIAN
      );
      const meal: IMeal = await this._mealService.removeMeal(req.params.mealId);
      return res.json(SuccessResponse.Created(meal));
    } catch (error) {
      return new Promise(() => {
        next(error);
      });
    }
  }

  @httpPut("/:mealId")
  public async updateMeal(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      this._authenticator.authenticate(
        req.headers.authorization,
        UserRole.DIETITIAN
      );
      this._validator.validate(req.body, mealPutSchema);
      const updatedMeal: IMeal = await this._mealService.putMeal(
        req.params.mealId,
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
