import { dietOrderPostSchema } from "../../schema/post/postDietOrder";
import { Request, Response } from "express";
import { SuccessResponse } from "../../../../response/SuccessResponse";
import { inject, injectable } from "inversify";
import { IDietOrderRepository } from "../../repository/IDietOrderRepository";
import { IDietOrder } from "../../model/DietOrder";
import { BaseController } from "../../../../core/baseController/BaseController";
import { DIET_ORDER_REPOSITORIES } from "../../ioc/DietOrderTypes";
import { IPostDietOrderController } from "./IPostController";

@injectable()
export class PostDietOrderController extends BaseController implements IPostDietOrderController {

    @inject(DIET_ORDER_REPOSITORIES.IDietOrderRepository)
    private readonly _dietOrderRepository: IDietOrderRepository;

    async process(req: Request, res: Response): Promise<Response> {
        this._validator.validate(req.body, dietOrderPostSchema);
        const dietOrder: IDietOrder = await this._dietOrderRepository.insertOne(req.body);

        return res.json(SuccessResponse.Created(dietOrder));
    }
}
