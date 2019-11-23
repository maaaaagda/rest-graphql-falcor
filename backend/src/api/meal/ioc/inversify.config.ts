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
import { GetMealController } from "../controller/getMealController/GetController";
import { IGetMealController } from "../controller/getMealController/IGetController";
import { IPostMealController } from "../controller/postMealController/IPostController";
import { PostMealController } from "../controller/postMealController/PostController";
import { IPutMealController } from "../controller/putMealController/IPutController";
import { PutMealController } from "../controller/putMealController/PutController";
import { MealRepository } from "../repository/MealRepository";
import { IMealRepository } from "../repository/IMealRepository";
import { MEAL_REPOSITORIES, MEAL_TYPES } from "./MealTypes";
import { MealService } from "../service/MealService";

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
    .bind<IMealRepository>(MEAL_REPOSITORIES.IMealRepository)
    .to(MealRepository);

  container
    .bind<IPostMealController>(MEAL_TYPES.IPostMealController)
    .to(PostMealController)
    .inSingletonScope();

  container
    .bind<IGetMealController>(MEAL_TYPES.IGetMealController)
    .to(GetMealController)
    .inSingletonScope();

  container
    .bind<IPutMealController>(MEAL_TYPES.IPutMealController)
    .to(PutMealController)
    .inSingletonScope();

  container
    .bind<IAuthenticator>(TYPES.IAuthenticator)
    .to(Authenticator)
    .inSingletonScope();

  container
    .bind<MealService>(MEAL_TYPES.IMealService)
    .to(MealService)
    .inSingletonScope();

  return container;
};

export default getContainer;
