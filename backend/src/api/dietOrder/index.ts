import { Container } from "inversify";
import getContainer from "./ioc/inversify.config";
import { IPostDietOrderController } from "./controller/postDietOrderController/IPostController";
import { DIET_ORDER_TYPES } from "./ioc/DietOrderTypes";
import { Application } from "express";
import { IDatabase } from "../../core/database/IDatabase";
import { TYPES } from "../../ioc/types";
import { IGetDietOrderController } from "./controller/getDietOrderController/IGetController";
import { IPutDietOrderController } from "./controller/putDietOrderController/IPutController";

export const initDietOrderRoutes = (app: Application, prefix: string = "" ): void => {
  const container: Container = getContainer();

  const database: IDatabase = container.get<IDatabase>(TYPES.IDatabase);
  database.getConnection();

  const postDietOrderController: IPostDietOrderController = container.get(DIET_ORDER_TYPES.IPostDietOrderController);
  const getDietOrderController: IGetDietOrderController = container.get(DIET_ORDER_TYPES.IGetDietOrderController);
  const updateDietOrderController: IPutDietOrderController = container.get(DIET_ORDER_TYPES.IPutDietOrderController)

  const path = `${prefix}/dietOrder`
  app.post(path, postDietOrderController.process.bind(postDietOrderController));
  app.get(path, getDietOrderController.process.bind(getDietOrderController));
  app.put(`${path}/:id`, updateDietOrderController.process.bind(updateDietOrderController))
};
