import { injectable } from "inversify";
import { Schema } from "mongoose";
import { BaseRepository } from "../../../core/repository/BaseRepository";
import { IDiet } from "../model/Diet";
import { dietSchema } from "../model/DietSchema";
import { IDietRepository } from "./IDietRepository";

@injectable()
export class DietRepository extends BaseRepository<IDiet>
  implements IDietRepository {
  protected model: string = "Diet";
  protected schema: Schema<IDiet> = dietSchema;
}
