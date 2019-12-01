import { NextFunction, Request, Response } from "express";
import { Container, inject } from "inversify";
import {
  controller,
  httpGet,
  httpPost,
  httpPut,
  interfaces
} from "inversify-express-utils";
import { DIET_ORDER_TYPES } from "./ioc/DietOrderTypes";
import getContainer from "./ioc/inversify.config";
import { Config } from "../../config/Config";
import { IDietOrder } from "./model/DietOrder";
import { SuccessResponse } from "../../response/SuccessResponse";
import { dietOrderPostSchema } from "./schema/post/postDietOrder";
import { dietOrderPutSchema } from "./schema/put/putDietOrder";
import { IDietOrderService } from "./service/IDietOrderService";
import { TYPES } from "../../ioc/types";
import { IAuthenticator } from "../../core/auth/IAuthenticator";
import { IValidator } from "../../core/validator/IValidator";
import { UserRole } from "../user/model/UserRole";

const config: Config = new Config();
const ENDPOINT: string = "diet-orders";

@controller(`${config.API_PATH}${ENDPOINT}`)
export class DietOrderController implements interfaces.Controller {
  private readonly _container: Container = getContainer();

  private readonly _dietOrderService: IDietOrderService = this._container.get<
    IDietOrderService
  >(DIET_ORDER_TYPES.IDietOrderService);

  @inject(TYPES.IAuthenticator)
  private readonly _authenticator: IAuthenticator;

  @inject(TYPES.IValidator)
  private readonly _validator: IValidator;

  @httpGet("/")
  public async getDietOrder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { userId } = this._authenticator.authenticate(
        req.headers.authorization
      );
      const dietOrders: IDietOrder[] = await this._dietOrderService.getDietOrders(
        userId
      );
      return res.json(SuccessResponse.Ok(dietOrders));
    } catch (error) {
      return new Promise(() => {
        next(error);
      });
    }
  }

  @httpGet("/all")
  public async getAllDietOrder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      this._authenticator.authenticate(
        req.headers.authorization,
        UserRole.ADMIN
      );
      const dietOrders: IDietOrder[] = await this._dietOrderService.getAllDietOrders();
      return res.json(SuccessResponse.Ok(dietOrders));
    } catch (error) {
      return new Promise(() => {
        next(error);
      });
    }
  }

  @httpPost("/")
  public async postDietOrder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { userId } = this._authenticator.authenticate(
        req.headers.authorization
      );
      this._validator.validate(req.body, dietOrderPostSchema);
      const dietOrder: IDietOrder = await this._dietOrderService.postDietOrder(
        req.body,
        userId
      );
      return res.json(SuccessResponse.Created(dietOrder));
    } catch (error) {
      return new Promise(() => {
        next(error);
      });
    }
  }

  @httpPut("/")
  public async updateDietOrder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      this._authenticator.authenticate(req.headers.authorization);
      this._validator.validate(req.body, dietOrderPutSchema);
      const updatedDietOrder: IDietOrder = await this._dietOrderService.putDietOrder(
        req.query.id,
        req.body
      );
      return res.json(SuccessResponse.Ok(updatedDietOrder));
    } catch (error) {
      return new Promise(() => {
        next(error);
      });
    }
  }
}
