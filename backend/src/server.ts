import * as bodyParser from "body-parser";
import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import { Container } from "inversify";
import "reflect-metadata";
// tslint:disable-next-line: ordered-imports
import { InversifyExpressServer } from "inversify-express-utils";
import * as swagger from "swagger-express-ts";
import { IConfig } from "./config/IConfig";
import { IDatabase } from "./core/database/IDatabase";
import { IErrorHandler } from "./core/errorHandler/IErrorHandler";
import getContainer from "./ioc/inversify.config";
import { TYPES } from "./ioc/types";

async function bootstrap(): Promise<void> {
  const container: Container = getContainer();
  const config: IConfig = container.get<IConfig>(TYPES.IConfig);
  const errorHandler: IErrorHandler = container.get<IErrorHandler>(
    TYPES.IErrorHandler
  );
  const database: IDatabase = container.get<IDatabase>(TYPES.IDatabase);
  await database.getConnection();

  const server: InversifyExpressServer = new InversifyExpressServer(container);
  const port: number = config.PORT || 3000;

  server.setConfig((app: Application) => {
    app.use("/api-docs/swagger", express.static("swagger"));
    app.use(
      "/api-docs/swagger/assets",
      express.static("node_modules/swagger-ui-dist")
    );
    app.use(helmet());
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(
      swagger.express({
        definition: {
          info: {
            title: "Diet In A Box API",
            version: "1.0"
          },
          basePath: "/api"
        }
      })
    );
  });

  server.setErrorConfig((app: Application) => {
    app.use(errorHandler.handle());
  });

  process
    .on("unhandledRejection", (reason: any, p: any) => {
      console.error(reason, "Unhandled rejection at Promise", p);
    })
    .on("uncaughtException", (error: any) => {
      console.error(error, "Uncaught Exception thrown");
      process.exit(1);
    });

  const application: Application = server.build();
  application.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}

bootstrap();
