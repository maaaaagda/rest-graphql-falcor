import { IUtilsRepository } from "./IUtilsRepository";
import { inject, injectable } from "inversify";
import { Connection, Collection } from "mongoose";
import { TYPES } from "../../ioc/types";
import { IDatabase } from "../database/IDatabase";

const collectionsToExcludeFromRemoving: string[] = ["products"];

@injectable()
export class UtilsRepository implements IUtilsRepository {
  protected model: string;

  @inject(TYPES.IDatabase)
  private readonly _db: () => IDatabase;

  public async clearDatabase(): Promise<void> {
    const dbInstance: IDatabase = await this._db();
    const connection: Connection = await dbInstance.getConnection();
    const collectionNames: string[] = (await connection.db.listCollections()
      .toArray())
      .map((collection: Collection) =>  collection.name);
    for ( const collectionName of collectionNames) {
      if (!collectionsToExcludeFromRemoving.includes(collectionName)) {
        await connection.db.dropCollection(collectionName);
      }
    }
    }
}
