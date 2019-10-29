import "reflect-metadata";

import { Container } from "inversify";
import { TYPES } from "../../../ioc/types";
import { Config } from "../../../config/Config";
import { IConfig } from "../../../config/IConfig";
import { IValidator } from "../../../core/validator/IValidator";
import { Validator } from "../../../core/validator/Validator";
import { ILogger } from "../../../core/logger/ILogger";
import { IDatabase } from "../../../core/database/IDatabase";
import { Logger } from "../../../core/logger/Logger";
import { Database } from "../../../core/database/Database";
import { IPostDietOrderController } from "../controller/postDietOrderController/IPostController";
import { DIET_ORDER_TYPES, DIET_ORDER_REPOSITORIES } from "./DietOrderTypes";
import { PostDietOrderController } from "../controller/postDietOrderController/PostController";
import { IDietOrderRepository } from "../repository/IDietOrderRepository";
import { DietOrderRepository } from "../repository/DietOrderRepository";
import { IGetDietOrderController } from "../controller/getDietOrderController/IGetController";
import { GetDietOrderController } from "../controller/getDietOrderController/GetController";
import { IPutDietOrderController } from "../controller/putDietOrderController/IPutController";
import { PutDietOrderController } from "../controller/putDietOrderController/PutController";

const getContainer: (() => Container) = (): Container => {
  const container: Container = new Container();
  container.bind<IConfig>(TYPES.IConfig)
    .to(Config)
    .inSingletonScope();

  container.bind<IValidator>(TYPES.IValidator)
    .to(Validator)
    .inSingletonScope();

  container.bind<ILogger>(TYPES.ILogger)
    .to(Logger)
    .inSingletonScope();

  container.bind<IDatabase>(TYPES.IDatabase)
    .to(Database)
    .inSingletonScope();

  container.bind<IDietOrderRepository>(DIET_ORDER_REPOSITORIES.IDietOrderRepository)
    .to(DietOrderRepository);

  container.bind<IPostDietOrderController>(DIET_ORDER_TYPES.IPostDietOrderController)
    .to(PostDietOrderController)
    .inSingletonScope();

  container.bind<IGetDietOrderController>(DIET_ORDER_TYPES.IGetDietOrderController)
    .to(GetDietOrderController)
    .inSingletonScope();

  container.bind<IPutDietOrderController>(DIET_ORDER_TYPES.IPutDietOrderController)
    .to(PutDietOrderController)
    .inSingletonScope();

  return container;
};

export default getContainer;
