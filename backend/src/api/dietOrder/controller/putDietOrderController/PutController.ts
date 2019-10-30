import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { BaseController } from "../../../../core/baseController/BaseController";
import { ErrorResponse } from "../../../../response/ErrorResponse";
import { SuccessResponse } from "../../../../response/SuccessResponse";
import { DIET_ORDER_REPOSITORIES } from "../../ioc/DietOrderTypes";
import { IDietOrder } from "../../model/DietOrder";
import { IDietOrderRepository } from "../../repository/IDietOrderRepository";
import { dietOrderPutSchema } from "../../schema/put/putDietOrder";
import { IPutDietOrderController } from "./IPutController";

@injectable()
export class PutDietOrderController extends BaseController implements IPutDietOrderController {

    @inject(DIET_ORDER_REPOSITORIES.IDietOrderRepository)
    private readonly _dietOrderRepository: IDietOrderRepository;

    public async process(req: Request, res: Response): Promise<Response> {
        this._validator.validate(req.body, dietOrderPutSchema);
        const dietOrderToModify: IDietOrder = await this._dietOrderRepository.getOne({id: req.params.id});
        if (dietOrderToModify) {
            const updated = await this._dietOrderRepository.updateOneById(req.params.id,  { $set: { status: req.body.status }});
            return res.json(SuccessResponse.Ok(updated));
        }
        return res.json(ErrorResponse.BadRequest());

    }
}
