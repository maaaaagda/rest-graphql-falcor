import { inject } from "inversify";
import { Connection, Document, Model, MongooseDocument } from "mongoose";
import { TYPES } from "../../ioc/types";
import { IDatabase } from "../database/IDatabase";
import { IBaseRepository } from "./IBaseRepository";

export abstract class BaseRepository<T extends Document> implements IBaseRepository<T> {
    protected _model: string;

    @inject(TYPES.IDatabase)
    private readonly _db: IDatabase;

    public async insertOne(data: T): Promise<MongooseDocument> {
        const model: Model<T> = await this.getModel();
        return model.create(data);
    }

    private async getModel(): Promise<Model<T>> {
        const connection: Connection = await this._db.getConnection();
        console.log("Does this work?");
        console.log(this._model.toString());
        return connection.model<T>(this._model);
    }
}
