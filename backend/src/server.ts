import * as bodyParser from "body-parser";
import express, { Application } from "express";
import * as cors from "cors";
import * as helmet from "helmet";

import { Container } from "inversify";
import getContainer from "./ioc/inversify.config";
import { IConfig } from "./config/IConfig";
import { TYPES } from "./ioc/types";

async function bootstrap(): Promise<void> {
    const container: Container = getContainer();
    const config: IConfig = container.get<IConfig>(TYPES.ILogger);

    const app: Application = express();
    const port: number = config.PORT || 3000;

    initMiddlewares(app);
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
}

function initMiddlewares(app): void {
    app.use(helmet());
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
}

bootstrap();
