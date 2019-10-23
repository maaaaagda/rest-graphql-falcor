import * as bodyParser from "body-parser";
import * as express from "express";
import * as cors from "cors";
import * as helmet from "helmet";

import { Container } from "inversify";
import getContainer from "./ioc/inversify.config";
import { IConfig } from "./config/IConfig";
import { TYPES } from "./ioc/types";

async function bootstrap(): Promise<void> {
    const container: Container = getContainer();
    const config: IConfig = container.get<IConfig>(TYPES.ILogger);

    const app = express();
    const port = process.env.PORT || 3000;
}

bootstrap();
