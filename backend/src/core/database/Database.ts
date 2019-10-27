import { IDatabase } from "./IDatabase";
import { Connection, createConnection } from "mongoose";
import { inject } from "inversify";
import { TYPES } from "../../ioc/types";
import { IConfig } from "../../config/IConfig";
import { ILogger } from "../logger/ILogger";

export class Database implements IDatabase {

    private _connection: Connection;

    @inject(TYPES.IConfig)
    private readonly _config: IConfig;

    @inject(TYPES.ILogger)
    private readonly _logger: ILogger;

    async getConnection(): Promise<Connection> {
        if (!this._connection) {
            this._connection = await this.connect();
        }
        return this._connection;
    }

    async connect(): Promise<Connection> {
        try {
            const connection: Connection = await createConnection(
                this._config.DB_URL,
                {
                    keepAlive: true,
                    reconnectTries: Number.MAX_VALUE,
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });
            connection.on('error', (error) => {
                this.handleError(error);
            });

            return connection;
        } catch (error) {
            this.handleError(error);
        }
    }

    private handleError(error: string): void {
        this._logger.error(`Error connecting to database: ${JSON.stringify(error)}`);
    }
}