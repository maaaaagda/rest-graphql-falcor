import { Request } from "express";
import { Container } from "inversify";
import { controller, httpGet, httpPost, httpPut, interfaces } from "inversify-express-utils";
import { ApiOperationGet, ApiOperationPost, ApiOperationPut, ApiPath } from "swagger-express-ts";
import { IDatabase } from "../../core/database/IDatabase";
import { createPath } from "../../core/utils/apiUtils";
import { TYPES } from "../../ioc/types";
import { IGetDietController } from "./controller/getDietController/IGetController";
import { IPostDietController } from "./controller/postDietController/IPostController";
import { IPutDietController } from "./controller/putDietController/IPutController";
import { DIET_ORDER_TYPES } from "./ioc/DietTypes";
import getContainer from "./ioc/inversify.config";
import { dietPostSchema } from "./schema/post/postDiet";
import { dietPutSchema } from "./schema/put/putDiet";
const j2s = require("joi-to-swagger");

const ENDPOINT: string = "diet";

@ApiPath({
  path: createPath(ENDPOINT),
  name: ENDPOINT
})
@controller(createPath(ENDPOINT))
export class DietController implements interfaces.Controller {
  private readonly container: Container = getContainer();

  private readonly database: IDatabase = this.container.get<IDatabase>(TYPES.IDatabase);

  private readonly postDietController: IPostDietController = this.container.get(
    DIET_ORDER_TYPES.IPostDietController
  );
  private readonly getDietController: IGetDietController = this.container.get(
    DIET_ORDER_TYPES.IGetDietController
  );
  private readonly updateDietController: IPutDietController = this.container.get(
    DIET_ORDER_TYPES.IPutDietController
  );

  @ApiOperationGet({
    parameters: {},
    responses: {
      200: { description: "Success" }
    }
  })
  @httpGet("/")
  public async getDiet(req: Request, res: Request, next: Request) {
    await this.database.getConnection();
    this.getDietController.process.bind(this.getDietController)(req, res, next);
  }

  @ApiOperationPost({
    parameters: {
      body: { ...j2s(dietPostSchema).swagger}
    },
    responses: {
      200: { description: "Success" }
    }
  })
  @httpPost("/")
  public async postDiet() {
    await this.database.getConnection();
    this.postDietController.process.bind(this.postDietController)();
  }

  @ApiOperationPut({
    parameters: {
      body: {...j2s(dietPutSchema).swagger}
      },
    responses: {
      200: { description: "Success" }
    }
  })
  @httpPut("/")
  public async updateDiet() {
    await this.database.getConnection();
    this.updateDietController.process.bind(this.updateDietController)();
  }
}
