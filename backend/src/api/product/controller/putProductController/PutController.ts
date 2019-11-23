import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IAuthenticator } from "../../../../core/auth/IAuthenticator";
import { IValidator } from "../../../../core/validator/IValidator";
import { TYPES } from "../../../../ioc/types";
import { SuccessResponse } from "../../../../response/SuccessResponse";
import { PRODUCT_TYPES } from "../../ioc/ProductTypes";
import { IProduct } from "../../model/Product";
import { productPutSchema } from "../../schema/put/putProduct";
import { IPutProductController } from "./IPutController";
import { IProductService } from "../../service/IProductService";

@injectable()
export class PutProductController implements IPutProductController {

  @inject(PRODUCT_TYPES.IProductService)
  private readonly _productService: IProductService;

  @inject(TYPES.IAuthenticator)
  private readonly _authenticator: IAuthenticator;

  @inject(TYPES.IValidator)
  private readonly _validator: IValidator;

  public async process(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      this._authenticator.authenticate(req.headers.authorization);
      this._validator.validate(req.body, productPutSchema);
      const updatedProduct: IProduct = await this._productService.putProduct(req.query.id, req.body);
      return res.json(SuccessResponse.Ok(updatedProduct));
    } catch (error) {
      return new Promise(() => {
        next(error);
      });
    }

  }
}
