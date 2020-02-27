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
import { Context } from "vm";

export class ProductController {
  private readonly _container: Container = getContainer();
  private readonly _productService: IProductService = this._container.get<
    IProductService
  >(PRODUCT_TYPES.IProductService);

  private readonly _authenticator: IAuthenticator = this._container.get(
      TYPES.IAuthenticator
    );

  private readonly _validator: IValidator = this._container.get(TYPES.IValidator);

  public readonly getProducts = async (parent, args: { name?: string}, ctx: Context, info): Promise<IProduct[]> => {
    this._authenticator.authenticate(ctx.token);
    const products: IProduct[] = await this._productService.getProducts(
        args.name
      );
    return products;
  }

  public readonly addProduct = async (parent, args: { product: IProduct }, ctx: Context, info): Promise<IProduct> => {
    this._authenticator.authenticate(ctx.token);
    this._validator.validate(args.product, productAddSchema);
    const product: IProduct = await this._productService.addProduct(args.product);
    return product;
  }

  public readonly updateProduct = async (parent, args: { id: string, product: IProduct }, ctx: Context, info): Promise<IProduct> => {
    this._authenticator.authenticate(ctx.token);
    this._validator.validate(args.product, productUpdateSchema);
    const product: IProduct = await this._productService.updateProduct(args.id, args.product);
    return product;
  }

}
