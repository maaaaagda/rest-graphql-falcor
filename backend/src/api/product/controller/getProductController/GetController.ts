import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { SuccessResponse } from "../../../../response/SuccessResponse";
import { PRODUCT_TYPES } from "../../ioc/ProductTypes";
import { IProduct } from "../../model/Product";
import { IGetProductController } from "./IGetController";
import { IProductService } from "../../service/IProductService";

@injectable()
export class GetProductController implements IGetProductController {

  @inject(PRODUCT_TYPES.IProductService)
  private readonly _productService: IProductService;

  public async process(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const products: IProduct[] = await this._productService.getProducts();
      return res.json(SuccessResponse.Ok(products));
    } catch (error) {
      return new Promise(() => {
        next(error);
      });
    }
  }
}
