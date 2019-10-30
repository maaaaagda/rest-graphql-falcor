import { injectable } from "inversify";
import { Schema } from "mongoose";
import { BaseRepository } from "../../../core/repository/BaseRepository";
import { IDietOrder } from "../model/DietOrder";
import { dietOrderSchema } from "../model/DietOrderSchema";
import { IDietOrderRepository } from "./IDietOrderRepository";

@injectable()
export class DietOrderRepository extends BaseRepository<IDietOrder> implements IDietOrderRepository {
    protected model: string = "DietOrder";
    protected schema: Schema<IDietOrder> = dietOrderSchema;
}
