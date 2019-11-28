import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IAuthenticator } from "../../../../core/auth/IAuthenticator";
import { TYPES } from "../../../../ioc/types";
import { SuccessResponse } from "../../../../response/SuccessResponse";
// import { PRODUCT_TYPES } from "../../ioc/ProductTypes";
// import { IProduct } from "../../model/Product";
import { IPostProductController } from "./IPostController";
import { IProduct } from "../../model/Product";
// import { IProductService } from "../../service/IProductService";
const requestPromise = require("request-promise");
import _ from "lodash";

@injectable()
export class PostProductController implements IPostProductController {
  // @inject(PRODUCT_TYPES.IProductService)
  // private readonly _productService: IProductService;

  @inject(TYPES.IAuthenticator)
  private readonly _authenticator: IAuthenticator;

  public async process(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    let products: IProduct[] = [];
    try {
      this._authenticator.authenticate(req.headers.authorization);
      const nrOfproducts: number = req.query.nrOfProducts || 400;
      const offset: number = 40;
      let nrOfProductsFetched: number = 0;
      while (nrOfProductsFetched < nrOfproducts) {
        console.log(nrOfProductsFetched / 40);
        const requestParams: any = {
          uri: "https://api.edamam.com/api/food-database/parser",
          qs: {
            session: 0 + nrOfProductsFetched,
            ingr: "*",
            category: "generic-foods",
            categoryLabel: "food",
            app_id: req.query.app_id,
            app_key: req.query.app_key
          },
          json: true
        };
        const productsPayload: any = await requestPromise(requestParams);
        products = products.concat(productsPayload.hints);
        nrOfProductsFetched += offset;
        await this.sleep(2000);
      }
      return res.json(
        SuccessResponse.Created(
          this.getProductsInDBSchape(_.uniq(products, "name"))
        )
      );
    } catch (error) {
      return new Promise(() => {
        next(error);
      });
    }
  }

  private getProductsInDBSchape(products: any): IProduct {
    return products.map((product: any) => {
      const nutrients: any = product.food.nutrients;
      return {
        name: this.capitalize(product.food.label),
        kcal: nutrients.ENERC_KCAL || 0,
        protein: nutrients.PROCNT || 0,
        carbohydrate: nutrients.CHOCDF || 0,
        fat: nutrients.FAT || 0,
        fibre: nutrients.FIBTG || 0,
        photo: ""
      };
    });
  }

  private readonly capitalize = (s: string) => {
    if (typeof s !== "string") {
      return "";
    }
    s = s.toLocaleLowerCase();
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  private sleep(sleeepingTime: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, sleeepingTime));
  }
}
