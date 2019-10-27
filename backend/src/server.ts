import * as bodyParser from "body-parser";
import * as cors from "cors";
import express, { Application } from "express";
import * as helmet from "helmet";

import { Container } from "inversify";
import { IConfig } from "./config/IConfig";
import getContainer from "./ioc/inversify.config";
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

function initMiddlewares(app: Application): void {
    app.use(helmet());
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
}

bootstrap();
