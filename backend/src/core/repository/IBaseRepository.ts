import { MongooseDocument } from "mongoose";

export interface IBaseRepository<T> {
    insertOne(data: T): Promise<MongooseDocument>;
}
