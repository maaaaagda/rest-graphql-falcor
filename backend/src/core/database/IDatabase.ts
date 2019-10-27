import { Connection } from "mongoose";

export interface IDatabase {
    getConnection(): Promise<Connection>;
}