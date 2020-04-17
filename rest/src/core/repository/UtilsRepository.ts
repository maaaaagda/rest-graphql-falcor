import { IUtilsRepository } from "./IUtilsRepository";
import { inject, injectable } from "inversify";
import { Connection } from "mongoose";
import { TYPES } from "../../ioc/types";
import { IDatabase } from "../database/IDatabase";

@injectable()
export class UtilsRepository implements IUtilsRepository {
  protected model: string;

  @inject(TYPES.IDatabase)
  private readonly _db: () => IDatabase;

  public async clearDatabase(): Promise<void> {
    const dbInstance: IDatabase = await this._db();
    const connection: Connection = await dbInstance.getConnection();
    (await connection.db.listCollections().toArray()).forEach((collection: string) => {
        console.log(collection);
        // connection.db[collection].drop();
    });
    }
}
