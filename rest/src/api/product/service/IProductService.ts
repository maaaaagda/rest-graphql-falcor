import { IProduct } from "../model/Product";
import { IExternalProviderProduct } from "../model/IExternalProviderProduct";

export interface IProductService {
  getProducts(name?: string): Promise<IProduct[]>;
  postProduct(productParams: any): Promise<IProduct>;
  putProduct(id: string, productParams: any): Promise<IProduct>;
  seedProducts(appId: string, appKey: string): Promise<void>;
  searchForProduct(productName: string): Promise<IExternalProviderProduct[]>;
}
