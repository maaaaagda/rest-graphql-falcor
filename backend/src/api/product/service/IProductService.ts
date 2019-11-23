import { IProduct } from "../model/Product";

export interface IProductService {
  getProducts(): Promise<IProduct[]>;
  postProduct(productParams: any): Promise<IProduct>;
  putProduct(id: string, productParams: any): Promise<IProduct>;
}
