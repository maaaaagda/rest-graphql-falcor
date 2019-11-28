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
import { IGetProductController } from "./controller/getProductController/IGetController";
import { IPostProductController } from "./controller/postProductController/IPostController";
import { IPutProductController } from "./controller/putProductController/IPutController";
import { PRODUCT_TYPES } from "./ioc/ProductTypes";
import getContainer from "./ioc/inversify.config";
import { Config } from "../../config/Config";

const config: Config = new Config();
const ENDPOINT: string = "products";

@controller(`${config.API_PATH}${ENDPOINT}`)
export class ProductController implements interfaces.Controller {
  private readonly _container: Container = getContainer();
  private readonly _database: IDatabase = this._container.get<IDatabase>(
    TYPES.IDatabase
  );

  private readonly postProductController: IPostProductController = this._container.get(
    PRODUCT_TYPES.IPostProductController
  );
  private readonly getProductController: IGetProductController = this._container.get(
    PRODUCT_TYPES.IGetProductController
  );
  private readonly updateProductController: IPutProductController = this._container.get(
    PRODUCT_TYPES.IPutProductController
  );

  constructor() {
    this._database.getConnection();
  }

  @httpGet("/")
  public async getProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    return this.getProductController.process.bind(this.getProductController)(
      req,
      res,
      next
    );
  }

  @httpPost("/seed")
  public async seedProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    return this.postProductController.process.bind(this.postProductController)(
      req,
      res,
      next
    );
  }

  // @httpPost("/")
  // public async postProduct(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<Response> {
  //   return this.postProductController.process.bind(this.postProductController)(
  //     req,
  //     res,
  //     next
  //   );
  // }

  @httpPut("/")
  public async updateProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    return this.updateProductController.process.bind(
      this.updateProductController
    )(req, res, next);
  }
}
