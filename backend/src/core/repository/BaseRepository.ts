import { IBaseRepository } from "./IBaseRepository";
import { MongooseDocument, Connection, Model } from "mongoose";
import { inject } from "inversify";
import { IDatabase } from "../database/IDatabase";
import { TYPES } from "../../ioc/types";

export abstract class BaseRepository<T> implements IBaseRepository<T> {
    protected abstract _model: string;

    @inject(TYPES.IDatabase)
    private readonly _db: IDatabase;

    private async getModel(): Promise<Model<T>> {
        const connection: Connection = await this._db.getConnection();
        const model: Model<T> = connection.model(this._model);

        return Model;
    }

    async insertOne(): Promise<MongooseDocument> {
    }
}