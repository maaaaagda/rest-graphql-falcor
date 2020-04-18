import "reflect-metadata";
import { IUtilsService } from "./../service/IUtilsService";
import { UTILS_TYPES } from "./UtilsTypes";
import { Container, interfaces } from "inversify";
import { Config } from "../../../config/Config";
import { IConfig } from "../../../config/IConfig";
import database from "../../../core/database/Database";
import { IDatabase } from "../../../core/database/IDatabase";
import { ILogger } from "../../../core/logger/ILogger";
import { Logger } from "../../../core/logger/Logger";
import { IValidator } from "../../../core/validator/IValidator";
import { Validator } from "../../../core/validator/Validator";
import { TYPES } from "../../../ioc/types";
import { IUtilsController } from "../controller/utilsController/IUtilsController";
import { UtilsController } from "../controller/utilsController/UtilsController";
import { UtilsService } from "../service/UtilsService";
import { IUtilsRepository } from "../../../core/repository/IUtilsRepository";
import { UtilsRepository } from "../../../core/repository/UtilsRepository";

const getContainer: () => Container = (): Container => {
  const container: Container = new Container();
  container
    .bind<IConfig>(TYPES.IConfig)
    .to(Config)
    .inSingletonScope();

  container
    .bind<IValidator>(TYPES.IValidator)
    .to(Validator)
    .inSingletonScope();

  container
    .bind<ILogger>(TYPES.ILogger)
    .to(Logger)
    .inSingletonScope();

  container
    .bind<interfaces.Factory<IDatabase>>(TYPES.IDatabase)
    .toFactory<IDatabase>(() => {
      return () => {
        return database(
          container.get<IConfig>(TYPES.IConfig),
          container.get<ILogger>(TYPES.ILogger)) as IDatabase;
      };
    });

  container
    .bind<IUtilsService>(UTILS_TYPES.IUtilsService)
    .to(UtilsService);

  container
    .bind<IUtilsRepository>(UTILS_TYPES.IUtilsRepository)
    .to(UtilsRepository);

  container
    .bind<IUtilsController>(UTILS_TYPES.IUtilsController)
    .to(UtilsController)
    .inSingletonScope();

  return container;
};

export default getContainer;
