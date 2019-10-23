import "reflect-metadata";

import { Container } from "inversify";
import { IConfig } from "../config/IConfig";
import { TYPES } from "./types";
import { Config } from "../config/Config";


const getContainer: (() => Container) = (): Container => {
  const container = new Container();
  container.bind<IConfig>(TYPES.IConfig)
    .to(Config)
    .inSingletonScope();
  
  return container;
}

export default getContainer;
