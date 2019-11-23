import { IBaseRepository } from "../../../core/repository/IBaseRepository";
import { IProduct } from "../model/Product";

export interface IProductRepository extends IBaseRepository<IProduct> {}
