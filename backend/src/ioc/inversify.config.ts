import "reflect-metadata";

import { Container } from "inversify";
import { IConfig } from "../config/IConfig";
import { TYPES } from "./types";
import { Config } from "../config/Config";
import { IValidator } from "../core/validator/IValidator";
import { Validator } from "../core/validator/Validator";
import { ILogger } from "../core/logger/ILogger";
import { Logger } from "../core/logger/Logger";
import { IDatabase } from "../core/database/IDatabase";
import { Database } from "../core/database/Database";


const getContainer: (() => Container) = (): Container => {
  const container = new Container();
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
}

export default getContainer;
