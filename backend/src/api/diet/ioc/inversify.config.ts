import "reflect-metadata";
import { Container } from "inversify";
import { Config } from "../../../config/Config";
import { IConfig } from "../../../config/IConfig";
import { Authenticator } from "../../../core/auth/Authenticator";
import { IAuthenticator } from "../../../core/auth/IAuthenticator";
import { Database } from "../../../core/database/Database";
import { IDatabase } from "../../../core/database/IDatabase";
import { ILogger } from "../../../core/logger/ILogger";
import { Logger } from "../../../core/logger/Logger";
import { IValidator } from "../../../core/validator/IValidator";
import { Validator } from "../../../core/validator/Validator";
import { TYPES } from "../../../ioc/types";
import { GetDietController } from "../controller/getDietController/GetController";
import { IGetDietController } from "../controller/getDietController/IGetController";
import { IPostDietController } from "../controller/postDietController/IPostController";
import { PostDietController } from "../controller/postDietController/PostController";
import { IPutDietController } from "../controller/putDietController/IPutController";
import { PutDietController } from "../controller/putDietController/PutController";
import { DietRepository } from "../repository/DietRepository";
import { IDietRepository } from "../repository/IDietRepository";
import { DIET_REPOSITORIES, DIET_TYPES } from "./DietTypes";
import { DietService } from "../service/DietService";

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
    .bind<IDatabase>(TYPES.IDatabase)
    .to(Database)
    .inSingletonScope();

  container
    .bind<IDietRepository>(DIET_REPOSITORIES.IDietRepository)
    .to(DietRepository);

  container
    .bind<IPostDietController>(DIET_TYPES.IPostDietController)
    .to(PostDietController)
    .inSingletonScope();

  container
    .bind<IGetDietController>(DIET_TYPES.IGetDietController)
    .to(GetDietController)
    .inSingletonScope();

  container
    .bind<IPutDietController>(DIET_TYPES.IPutDietController)
    .to(PutDietController)
    .inSingletonScope();

  container
    .bind<IAuthenticator>(TYPES.IAuthenticator)
    .to(Authenticator)
    .inSingletonScope();

  container.bind<DietService>(DIET_TYPES.IDietService)
    .to(DietService)
    .inSingletonScope();

  return container;
};

export default getContainer;
