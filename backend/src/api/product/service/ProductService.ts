import { inject, injectable } from "inversify";
import { PRODUCT_REPOSITORIES } from "../ioc/ProductTypes";
import { IProductRepository } from "../repository/IProductRepository";
import { IProduct } from "../model/Product";
import { BadRequestError } from "../../../core/error/BadRequestError";

@injectable()
export class ProductService {

  @inject(PRODUCT_REPOSITORIES.IProductRepository)
  private readonly _productRepository: IProductRepository;

  public async getProducts(): Promise<IProduct[]> {
    return await this._productRepository.getMany();
  }

  public async postProduct(productParams: IProduct) {
    return await this._productRepository.insertOne(productParams);
  }

  public async putProduct(id: string, productParams: IProduct) {
    const productToModify: IProduct = await this._productRepository.getOne({
      _id: id
    });
    if (productToModify) {
      const updated: IProduct = await this._productRepository.updateOneById(id, {
        $set: productParams
      });
      return updated;
    }
    throw new BadRequestError();
  }
}
