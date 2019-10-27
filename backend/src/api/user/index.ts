import { Container } from "inversify";
import getContainer from "./ioc/inversify.config";
import { IPostUserController } from "./controller/postUserController/IPostController";
import { USER_TYPES } from "./ioc/UserTypes";
import { Application } from "express";
import { IDatabase } from "../../core/database/IDatabase";
import { TYPES } from "../../ioc/types";

export const initUserRoutes = (app: Application, prefix: string = "" ): void => {
  const container: Container = getContainer();

  const database: IDatabase = container.get<IDatabase>(TYPES.IDatabase);
  database.getConnection();
  
  const postUserController: IPostUserController = container.get(USER_TYPES.IPostUserController);
  const getUserController: IPostUserController = container.get(USER_TYPES.IGetUserController);

  app.post(`${prefix}/user`, postUserController.process.bind(postUserController));
  app.get(`${prefix}/user`, getUserController.process.bind(getUserController));
};
