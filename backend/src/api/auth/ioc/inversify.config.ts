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
import { USER_REPOSITORIES } from "../../user/ioc/UserTypes";
import { IUserRepository } from "../../user/repository/IUserRepository";
import { UserRepository } from "../../user/repository/UserRepository";
import { ILoginController } from "../controller/loginController/ILoginController";
import { LoginController } from "../controller/loginController/LoginController";
import { AUTH_TYPES } from "./AuthTypes";
import { IAuthenticator } from "../../../core/auth/IAuthenticator";
import { Authenticator } from "../../../core/auth/Authenticator";

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
    .bind<IUserRepository>(USER_REPOSITORIES.IUserRepository)
    .to(UserRepository);

  container
    .bind<ILoginController>(AUTH_TYPES.ILoginController)
    .to(LoginController)
    .inSingletonScope();

  container.bind<IAuthenticator>(TYPES.IAuthenticator)
    .to(Authenticator)
    .inSingletonScope()

  return container;
};

export default getContainer;
