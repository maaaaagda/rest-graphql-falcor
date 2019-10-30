import { dietOrderPutSchema } from "../../schema/put/putDietOrder";
import { Request, Response } from "express";
import { SuccessResponse } from "../../../../response/SuccessResponse";
import { inject, injectable } from "inversify";
import { IDietOrderRepository } from "../../repository/IDietOrderRepository";
import { IDietOrder } from "../../model/DietOrder";
import { BaseController } from "../../../../core/baseController/BaseController";
import { DIET_ORDER_REPOSITORIES } from "../../ioc/DietOrderTypes";
import { IPutDietOrderController } from "./IPutController";
import { ErrorResponse } from "../../../../response/ErrorResponse";

@injectable()
export class PutDietOrderController extends BaseController implements IPutDietOrderController {

    @inject(DIET_ORDER_REPOSITORIES.IDietOrderRepository)
    private readonly _dietOrderRepository: IDietOrderRepository;

    async process(req: Request, res: Response): Promise<Response> {
        this._validator.validate(req.body, dietOrderPutSchema);
        const dietOrderToModify: IDietOrder = await this._dietOrderRepository.getOne({id: req.params.id})
        if(dietOrderToModify) {
            const updated = await this._dietOrderRepository.updateOne({id: req.params.id},  { $set: { status: req.body.status }})
            return res.json(SuccessResponse.Ok(updated));
        }
        return res.json(ErrorResponse.BadRequest());

    }
}
