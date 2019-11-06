import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IAuthenticator } from "../../../../core/auth/IAuthenticator";
import { TYPES } from "../../../../ioc/types";
import { SuccessResponse } from "../../../../response/SuccessResponse";
import { DIET_ORDER_REPOSITORIES } from "../../ioc/DietOrderTypes";
import { IDietOrder } from "../../model/DietOrder";
import { IDietOrderRepository } from "../../repository/IDietOrderRepository";
import { IGetDietOrderController } from "./IGetController";

@injectable()
export class GetDietOrderController implements IGetDietOrderController {

    @inject(TYPES.IAuthenticator)
    private readonly _authenticator: IAuthenticator;

    @inject(DIET_ORDER_REPOSITORIES.IDietOrderRepository)
    private readonly _dietOrderRepository: IDietOrderRepository;

    public async process(req: Request, res: Response): Promise<Response> {
        this._authenticator.authenticate(req.headers.authorization);
        const users: IDietOrder[] = await this._dietOrderRepository.getMany();

        return res.json(SuccessResponse.Ok(users));
    }
}
