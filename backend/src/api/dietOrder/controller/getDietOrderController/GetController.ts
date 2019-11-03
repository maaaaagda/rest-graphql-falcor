import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { BaseController } from "../../../../core/baseController/BaseController";
import { SuccessResponse } from "../../../../response/SuccessResponse";
import { DIET_ORDER_REPOSITORIES } from "../../ioc/DietOrderTypes";
import { IDietOrder } from "../../model/DietOrder";
import { IDietOrderRepository } from "../../repository/IDietOrderRepository";
import { IGetDietOrderController } from "./IGetController";

@injectable()
export class GetDietOrderController extends BaseController implements IGetDietOrderController {

    @inject(DIET_ORDER_REPOSITORIES.IDietOrderRepository)
    private readonly _dietOrderRepository: IDietOrderRepository;

    public async process(req: Request, res: Response): Promise<Response> {
        const users: IDietOrder[] = await this._dietOrderRepository.getMany();

        return res.json(SuccessResponse.Ok(users));
    }
}
