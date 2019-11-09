import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IAuthenticator } from "../../../../core/auth/IAuthenticator";
import { TYPES } from "../../../../ioc/types";
import { SuccessResponse } from "../../../../response/SuccessResponse";
import { IDietOrder } from "../../model/DietOrder";
import { IGetDietOrderController } from "./IGetController";
import { DIET_ORDER_TYPES } from "../../../dietOrder/ioc/DietOrderTypes";
import { IDietOrderService } from "../../service/IDietOrderService";

@injectable()
export class GetDietOrderController implements IGetDietOrderController {

    @inject(DIET_ORDER_TYPES.IDietOrderService)
    private readonly _dietOrderService: IDietOrderService;

    @inject(TYPES.IAuthenticator)
    private readonly _authenticator: IAuthenticator;

    public async process(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            this._authenticator.authenticate(req.headers.authorization);
            const dietOrders: IDietOrder[] = await this._dietOrderService.getDietOrders();
            return res.json(SuccessResponse.Ok(dietOrders));
        } catch (error) {
            return new Promise(() => {
                next(error);
            });
        }
    }
}
