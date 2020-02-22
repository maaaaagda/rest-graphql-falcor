import "reflect-metadata";
import express from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import { Container } from "inversify";
import { IConfig } from "./config/IConfig";
import { IDatabase } from "./core/database/IDatabase";
import { IErrorHandler } from "./core/errorHandler/IErrorHandler";
import getContainer from "./ioc/inversify.config";
import { TYPES } from "./ioc/types";
import { GraphQLSchema } from "graphql";
import { ApolloServer } from "apollo-server-express";
import depthLimit from "graphql-depth-limit";
import { createServer, Server } from "http";
import createGraphQLSchema from "./graphql/schema";
import { Application } from "express";

const app: Application = express();
async function bootstrap(): Promise<void> {
  const container: Container = getContainer();
  const config: IConfig = container.get<IConfig>(TYPES.IConfig);
  const errorHandler: IErrorHandler = container.get<IErrorHandler>(
    TYPES.IErrorHandler
  );
  const databaseFactory: () => IDatabase = container.get<() => IDatabase>(TYPES.IDatabase);
  const dbInstance: IDatabase = databaseFactory();
  await dbInstance.getConnection();
  const schema: GraphQLSchema =  await createGraphQLSchema();
  const server: ApolloServer = new ApolloServer({
    schema,
    validationRules: [depthLimit(7)],
  });
  const port: number = config.PORT || 3001;
  app.use(helmet());
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use(errorHandler.handle());

  server.applyMiddleware({ app, path: "/graphql" });

  process
    .on("unhandledRejection", (reason: any, p: any) => {
      console.error(reason, "Unhandled rejection at Promise", p);
    })
    .on("uncaughtException", (error: any) => {
      console.error(error, "Uncaught Exception thrown");
      process.exit(1);
    });

  const application: Server = createServer(app);
  application.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}

bootstrap();
