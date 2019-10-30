import "reflect-metadata";

import { Container } from "inversify";
import { Config } from "../../../config/Config";
import { IConfig } from "../../../config/IConfig";
import { Database } from "../../../core/database/Database";
import { IDatabase } from "../../../core/database/IDatabase";
import { ILogger } from "../../../core/logger/ILogger";
import { Logger } from "../../../core/logger/Logger";
import { IValidator } from "../../../core/validator/IValidator";
import { Validator } from "../../../core/validator/Validator";
import { TYPES } from "../../../ioc/types";
import { GetUserController } from "../controller/getUserController/GetController";
import { IGetUserController } from "../controller/getUserController/IGetController";
import { IPostUserController } from "../controller/postUserController/IPostController";
import { PostUserController } from "../controller/postUserController/PostController";
import { IUserRepository } from "../repository/IUserRepository";
import { UserRepository } from "../repository/UserRepository";
import { USER_REPOSITORIES, USER_TYPES } from "./UserTypes";

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

  container.bind<IUserRepository>(USER_REPOSITORIES.IUserRepository)
    .to(UserRepository);

  container.bind<IPostUserController>(USER_TYPES.IPostUserController)
    .to(PostUserController)
    .inSingletonScope();

  container.bind<IGetUserController>(USER_TYPES.IGetUserController)
    .to(GetUserController)
    .inSingletonScope();
  
  return container;
};

export default getContainer;
