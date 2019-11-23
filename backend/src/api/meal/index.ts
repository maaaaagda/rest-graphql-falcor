import { NextFunction, Request, Response } from "express";
import { Container } from "inversify";
import {
  controller,
  httpGet,
  httpPost,
  httpPut,
  interfaces
} from "inversify-express-utils";
import { IDatabase } from "../../core/database/IDatabase";
import { TYPES } from "../../ioc/types";
import { IGetMealController } from "./controller/getMealController/IGetController";
import { IPostMealController } from "./controller/postMealController/IPostController";
import { IPutMealController } from "./controller/putMealController/IPutController";
import { MEAL_TYPES } from "./ioc/MealTypes";
import getContainer from "./ioc/inversify.config";
import { Config } from "../../config/Config";

const config: Config = new Config();
const ENDPOINT: string = "meals";

@controller(`${config.API_PATH}${ENDPOINT}`)
export class MealController implements interfaces.Controller {
  private readonly _container: Container = getContainer();
  private readonly _database: IDatabase = this._container.get<IDatabase>(
    TYPES.IDatabase
  );

  private readonly postMealController: IPostMealController = this._container.get(
    MEAL_TYPES.IPostMealController
  );
  private readonly getMealController: IGetMealController = this._container.get(
    MEAL_TYPES.IGetMealController
  );
  private readonly updateMealController: IPutMealController = this._container.get(
    MEAL_TYPES.IPutMealController
  );

  constructor() {
    this._database.getConnection();
  }

  @httpGet("/")
  public async getMeal(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    return this.getMealController.process.bind(this.getMealController)(
      req,
      res,
      next
    );
  }

  @httpPost("/")
  public async postMeal(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    return this.postMealController.process.bind(this.postMealController)(
      req,
      res,
      next
    );
  }

  @httpPut("/")
  public async updateMeal(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    return this.updateMealController.process.bind(this.updateMealController)(
      req,
      res,
      next
    );
  }
}
