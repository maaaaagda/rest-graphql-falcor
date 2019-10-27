import { inject } from "inversify";
import { Connection, createConnection } from "mongoose";
import { IConfig } from "../../config/IConfig";
import { TYPES } from "../../ioc/types";
import { ILogger } from "../logger/ILogger";
import { IDatabase } from "./IDatabase";

export class Database implements IDatabase {

    private _connection: Connection;

    @inject(TYPES.IConfig)
    private readonly _config: IConfig;

    @inject(TYPES.ILogger)
    private readonly _logger: ILogger;

    public async getConnection(): Promise<Connection> {
        if (!this._connection) {
            this._connection = await this.connect();
        }
        return this._connection;
    }

    public async connect(): Promise<Connection> {
        try {
            const connection: Connection = await createConnection(
                this._config.DB_URL,
                {
                    keepAlive: true,
                    reconnectTries: Number.MAX_VALUE,
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                });
            connection.on("error", (error) => {
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
