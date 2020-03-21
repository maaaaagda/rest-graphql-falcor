import { injectable } from "inversify";
import { Schema } from "mongoose";
import { BaseRepository } from "../../../core/repository/BaseRepository";
import { IDietOrder } from "../model/DietOrder";
import { dietOrderSchema } from "../model/DietOrderSchema";
import { IDietOrderRepository } from "./IDietOrderRepository";

@injectable()
export class DietOrderRepository extends BaseRepository<IDietOrder<Date>>
  implements IDietOrderRepository {
  protected model: string = "DietOrder";
  protected schema: Schema<IDietOrder<Date>> = dietOrderSchema;

  public async getDietOrdersByCustomerId(customerId: string) {
    const model = await this.getModel();
    return model.find({ customerId });
  }
}
