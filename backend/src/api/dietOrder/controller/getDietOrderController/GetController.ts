import { Request, Response } from "express";
import { SuccessResponse } from "../../../../response/SuccessResponse";
import { inject, injectable } from "inversify";
import { IDietOrderRepository } from "../../repository/IDietOrderRepository";
import { IDietOrder } from "../../model/DietOrder";
import { BaseController } from "../../../../core/baseController/BaseController";
import { DIET_ORDER_REPOSITORIES } from "../../ioc/DietOrderTypes";
import { IGetDietOrderController } from "./IGetController";

@injectable()
export class GetDietOrderController extends BaseController implements IGetDietOrderController {

    @inject(DIET_ORDER_REPOSITORIES.IUserRepository)
    private readonly _dietOrderRepository: IDietOrderRepository;

    async process(req: Request, res: Response): Promise<Response> {
        const users: IDietOrder[] = await this._dietOrderRepository.getMany();

        return res.json(SuccessResponse.Ok(users));
    }
}
