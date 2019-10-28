import { BaseRepository } from "../../../core/repository/BaseRepository";
import { IDietOrder } from "../model/DietOrder";
import { injectable } from "inversify";
import { IDietOrderRepository } from "./IDietOrderRepository";
import { dietOrderSchema } from "../model/DietOrderSchema";
import { Schema } from "mongoose";

@injectable()
export class DietOrderRepository extends BaseRepository<IDietOrder> implements IDietOrderRepository {
    protected model: string = "DietOrder";
    protected schema: Schema<IDietOrder> = dietOrderSchema;
}
