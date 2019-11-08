import { NextFunction, Request, Response } from "express";
import { Container } from "inversify";
import {
  controller,
  httpGet,
  httpPost,
  httpPut,
  interfaces
} from "inversify-express-utils";
import j2s from "joi-to-swagger";
import {
  ApiOperationGet,
  ApiOperationPost,
  ApiOperationPut,
  ApiPath
} from "swagger-express-ts";
import { IDatabase } from "../../core/database/IDatabase";
import { handleEndpointError } from "../../core/errorHandler/handleEndpointError";
import { createPath } from "../../core/utils/apiUtils";
import { TYPES } from "../../ioc/types";
import { IGetDietController } from "./controller/getDietController/IGetController";
import { IPostDietController } from "./controller/postDietController/IPostController";
import { IPutDietController } from "./controller/putDietController/IPutController";
import { DIET_ORDER_TYPES } from "./ioc/DietTypes";
import getContainer from "./ioc/inversify.config";
import { dietPostSchema } from "./schema/post/postDiet";
import { dietPutSchema } from "./schema/put/putDiet";

const ENDPOINT: string = "diet";

@ApiPath({
  path: createPath(ENDPOINT),
  name: ENDPOINT
})
@controller(createPath(ENDPOINT))
export class DietController implements interfaces.Controller {
  private readonly container: Container = getContainer();
  private readonly database: IDatabase = this.container.get<IDatabase>(
    TYPES.IDatabase
  );

  private readonly postDietController: IPostDietController = this.container.get(
    DIET_ORDER_TYPES.IPostDietController
  );
  private readonly getDietController: IGetDietController = this.container.get(
    DIET_ORDER_TYPES.IGetDietController
  );
  private readonly updateDietController: IPutDietController = this.container.get(
    DIET_ORDER_TYPES.IPutDietController
  );

  constructor() {
    this.database.getConnection();
  }

  @ApiOperationGet({
    parameters: {},
    responses: {
      200: { description: "Success" }
    }
  })
  @httpGet("/")
  public async getDiet(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    return handleEndpointError(
      req,
      res,
      next,
      this.getDietController.process.bind(this.getDietController)
    );
  }

  @ApiOperationPost({
    parameters: {
      body: { ...j2s(dietPostSchema).swagger }
    },
    responses: {
      200: { description: "Success" }
    }
  })
  @httpPost("/")
  public async postDiet(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    return handleEndpointError(
      req,
      res,
      next,
      this.postDietController.process.bind(this.postDietController)
    );
  }

  @ApiOperationPut({
    parameters: {
      body: { ...j2s(dietPutSchema).swagger }
    },
    responses: {
      200: { description: "Success" }
    }
  })
  @httpPut("/")
  public async updateDiet(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    return handleEndpointError(
      req,
      res,
      next,
      this.updateDietController.process.bind(this.updateDietController)
    );
  }
}
