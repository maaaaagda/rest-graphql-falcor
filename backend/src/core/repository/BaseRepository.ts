import { inject, injectable } from "inversify";
import { Connection, Document, Model, Schema } from "mongoose";
import { TYPES } from "../../ioc/types";
import { IDatabase } from "../database/IDatabase";
import { IBaseRepository } from "./IBaseRepository";

@injectable()
export abstract class BaseRepository<T extends Document> implements IBaseRepository<T> {
    protected model: string;
    protected schema: Schema<T>;

    @inject(TYPES.IDatabase)
    private readonly _db: IDatabase;

    public async insertOne(data: T): Promise<T> {
        const model: Model<T> = await this.getModel();
        return model.create(data);
    }

    public async getMany(limit?: number, page?: number): Promise<T[]> {
        const model: Model<T> = await this.getModel();
        if (!limit || !page) {
            return model.find({});
        }
        return model.find({}).limit(limit).skip(page * limit);
    }

    public async getOne(params: object): Promise<T> {
        const model: Model<T> = await this.getModel();
        return model.findOne(params);
    }

    public async updateOneById(id: string, params: object): Promise<T> {
        const model: Model<T> = await this.getModel();
        return model.updateOne({id}, params);
    }

    private async getModel(): Promise<Model<T>> {
        const connection: Connection = await this._db.getConnection();
        return connection.model<T>(this.model, this.schema);
    }
}
