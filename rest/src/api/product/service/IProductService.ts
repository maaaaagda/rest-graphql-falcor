import { IProduct } from "../model/Product";
import { IExternalProviderProduct } from "../model/IExternalProviderProduct";

export interface IProductService {
  getProducts(name?: string): Promise<IProduct[]>;
  postProduct(productParams: any): Promise<IProduct>;
  putProduct(id: string, productParams: any): Promise<IProduct>;
  seedProducts(nrOfProducts: number): Promise<void>;
}
