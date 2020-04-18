import { SuccessResponse } from "./../../../../graphql/src/response/SuccessResponse";
import { UTILS_TYPES } from "./ioc/UtilsTypes";
import { NextFunction, Request, Response } from "express";
import { Container } from "inversify";
import { controller, httpPost, interfaces } from "inversify-express-utils";
import getContainer from "./ioc/inversify.config";
import { Config } from "../../config/Config";
import { IUtilsController } from "./controller/utilsController/IUtilsController";

const config: Config = new Config();
const ENDPOINT: string = "utils";

@controller(`${config.API_PATH}${ENDPOINT}`)
export class UtilsController implements interfaces.Controller {
  private readonly _container: Container = getContainer();

  private readonly _utilsController: IUtilsController = this._container.get(
    UTILS_TYPES.IUtilsController
  );

  @httpPost("/clear-database")
  public async utils(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      await this._utilsController.clearDatabase();
      return res.json(SuccessResponse.Ok());
    } catch (error) {
      return new Promise(() => {
        next(error);
      });
    }
  }
}
