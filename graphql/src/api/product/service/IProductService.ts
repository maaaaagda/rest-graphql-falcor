import { IProduct } from "../model/Product";
import { IExternalProviderProduct } from "../model/IExternalProviderProduct";

export interface IProductService {
  getProducts(name?: string): Promise<IProduct[]>;
  addProduct(productParams: any): Promise<IProduct>;
  updateProduct(id: string, productParams: any): Promise<IProduct>;
}
