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
import { IGetDietController } from "./controller/getDietController/IGetController";
import { IPostDietController } from "./controller/postDietController/IPostController";
import { IPutDietController } from "./controller/putDietController/IPutController";
import { DIET_TYPES } from "./ioc/DietTypes";
import getContainer from "./ioc/inversify.config";
import { Config } from "../../config/Config";

const config: Config = new Config();
const ENDPOINT: string = "diet";

@controller(`${config.API_PATH}${ENDPOINT}`)
export class DietController implements interfaces.Controller {
  private readonly _container: Container = getContainer();
  private readonly _database: IDatabase = this._container.get<IDatabase>(
    TYPES.IDatabase
  );

  private readonly postDietController: IPostDietController = this._container.get(
    DIET_TYPES.IPostDietController
  );
  private readonly getDietController: IGetDietController = this._container.get(
    DIET_TYPES.IGetDietController
  );
  private readonly updateDietController: IPutDietController = this._container.get(
    DIET_TYPES.IPutDietController
  );

  constructor() {
    this._database.getConnection();
  }

  @httpGet("/")
  public async getDiet(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    return this.getDietController.process.bind(this.getDietController)(
      req,
      res,
      next
    );
  }

  @httpPost("/")
  public async postDiet(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    return this.postDietController.process.bind(this.postDietController)(
      req,
      res,
      next
    );
  }

  @httpPut("/")
  public async updateDiet(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    return this.updateDietController.process.bind(this.updateDietController)(
      req,
      res,
      next
    );
  }
}
