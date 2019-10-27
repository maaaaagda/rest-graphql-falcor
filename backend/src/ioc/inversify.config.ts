import "reflect-metadata";

import { Container } from "inversify";
import { Config } from "../config/Config";
import { IConfig } from "../config/IConfig";
import { Database } from "../core/database/Database";
import { IDatabase } from "../core/database/IDatabase";
import { ILogger } from "../core/logger/ILogger";
import { Logger } from "../core/logger/Logger";
import { IValidator } from "../core/validator/IValidator";
import { Validator } from "../core/validator/Validator";
import { TYPES } from "./types";

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
  
  return container;
};

export default getContainer;
