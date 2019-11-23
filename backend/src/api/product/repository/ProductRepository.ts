import { injectable } from "inversify";
import { Schema } from "mongoose";
import { BaseRepository } from "../../../core/repository/BaseRepository";
import { IProduct } from "../model/Product";
import { productSchema } from "../model/ProductSchema";
import { IProductRepository } from "./IProductRepository";

@injectable()
export class ProductRepository extends BaseRepository<IProduct>
  implements IProductRepository {
  protected model: string = "Product";
  protected schema: Schema<IProduct> = productSchema;
}
