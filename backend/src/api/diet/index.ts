import { Application } from "express";
import { Container } from "inversify";
import { IDatabase } from "../../core/database/IDatabase";
import { TYPES } from "../../ioc/types";
import { IGetDietController } from "./controller/getDietController/IGetController";
import { IPostDietController } from "./controller/postDietController/IPostController";
import { IPutDietController } from "./controller/putDietController/IPutController";
import { DIET_ORDER_TYPES } from "./ioc/DietTypes";
import getContainer from "./ioc/inversify.config";

export const initDietRoutes = (app: Application, prefix: string = ""): void => {
  const container: Container = getContainer();

  const database: IDatabase = container.get<IDatabase>(TYPES.IDatabase);
  database.getConnection();

  const postDietController: IPostDietController = container.get(
    DIET_ORDER_TYPES.IPostDietController
  );
  const getDietController: IGetDietController = container.get(
    DIET_ORDER_TYPES.IGetDietController
  );
  const updateDietController: IPutDietController = container.get(
    DIET_ORDER_TYPES.IPutDietController
  );

  const path: string = `${prefix}/diet`;
  app.post(path, postDietController.process.bind(postDietController));
  app.get(path, getDietController.process.bind(getDietController));
  app.put(path, updateDietController.process.bind(updateDietController));
};
