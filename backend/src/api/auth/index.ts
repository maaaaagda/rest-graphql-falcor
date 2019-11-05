import { Application } from "express";
import { Container } from "inversify";
import { IDatabase } from "../../core/database/IDatabase";
import { handleEndpointError } from "../../core/errorHandler/handleEndpointError";
import { TYPES } from "../../ioc/types";
import { ILoginController } from "./controller/loginController/ILoginController";
import { AUTH_TYPES } from "./ioc/AuthTypes";
import getContainer from "./ioc/inversify.config";

export const initUserRoutes = (app: Application, prefix: string = ""): void => {
  const container: Container = getContainer();

  const database: IDatabase = container.get<IDatabase>(TYPES.IDatabase);
  database.getConnection();

  const loginController: ILoginController = container.get(
    AUTH_TYPES.ILoginController
  );

  app.post(
    `${prefix}/login`,
    handleEndpointError(loginController.process.bind(loginController))
  );
};
