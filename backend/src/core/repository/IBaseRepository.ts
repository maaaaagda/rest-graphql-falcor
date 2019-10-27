import { MongooseDocument } from "mongoose";

export interface IBaseRepository<T> {
    insertOne(): Promise<MongooseDocument>;
}
