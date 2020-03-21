import { productAddSchema } from "./../schema/addProduct";
import { productUpdateSchema } from "./../schema/updateProduct";
import { Container } from "inversify";
import { TYPES } from "../../../ioc/types";
import { PRODUCT_TYPES } from "../ioc/ProductTypes";
import getContainer from "../ioc/inversify.config";
import { IProductService } from "../service/IProductService";
import { IProduct } from "../model/Product";
import { IAuthenticator } from "../../../core/auth/IAuthenticator";
import { IValidator } from "../../../core/validator/IValidator";

export class ProductController {
  private readonly _container: Container = getContainer();
  private readonly _productService: IProductService = this._container.get<
    IProductService
  >(PRODUCT_TYPES.IProductService);

  private readonly _authenticator: IAuthenticator = this._container.get(
      TYPES.IAuthenticator
    );

  private readonly _validator: IValidator = this._container.get(TYPES.IValidator);

  public readonly getProducts = async (name: string): Promise<IProduct[]> => {
    const products: IProduct[] = await this._productService.getProducts(name);
    return products;
  }

  public readonly addProduct = async ( productData: IProduct ): Promise<IProduct> => {
    this._validator.validate(productData, productAddSchema);
    const product: IProduct = await this._productService.addProduct(productData);
    return product;
  }

  public readonly updateProduct = async ( id: string, productData: IProduct): Promise<IProduct> => {
    this._validator.validate(productData, productUpdateSchema);
    const product: IProduct = await this._productService.updateProduct(id, productData);
    return product;
  }

}
