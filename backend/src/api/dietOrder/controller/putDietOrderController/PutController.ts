import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IAuthenticator } from "../../../../core/auth/IAuthenticator";
import { IValidator } from "../../../../core/validator/IValidator";
import { TYPES } from "../../../../ioc/types";
import { SuccessResponse } from "../../../../response/SuccessResponse";
import { DIET_ORDER_TYPES } from "../../ioc/DietOrderTypes";
import { IDietOrder } from "../../model/DietOrder";
import { dietOrderPutSchema } from "../../schema/put/putDietOrder";
import { IPutDietOrderController } from "./IPutController";
import { IDietOrderService } from "../../service/IDietOrderService";

@injectable()
export class PutDietOrderController implements IPutDietOrderController {

    @inject(DIET_ORDER_TYPES.IDietOrderService)
    private readonly _dietOrderService: IDietOrderService;

    @inject(TYPES.IAuthenticator)
    private readonly _authenticator: IAuthenticator;

    @inject(TYPES.IValidator)
    private readonly _validator: IValidator;

    public async process(req: Request, res: Response, next: NextFunction): Promise<Response> {
      try {
      this._authenticator.authenticate(req.headers.authorization);
      this._validator.validate(req.body, dietOrderPutSchema);
      const updatedDietOrder: IDietOrder = await this._dietOrderService.putDietOrder(
        req.query.id, req.body);
      return res.json(SuccessResponse.Ok(updatedDietOrder));
      } catch (error) {
        return new Promise(() => {
          next(error);
        });
      }
    }
}
