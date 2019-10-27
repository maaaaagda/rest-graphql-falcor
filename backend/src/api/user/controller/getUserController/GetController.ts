import { Request, Response } from "express";
import { SuccessResponse } from "../../../../response/SuccessResponse";
import { inject, injectable } from "inversify";
import { IUserRepository } from "../../repository/IUserRepository";
import { IUser } from "../../model/User";
import { BaseController } from "../../../../core/baseController/BaseController";
import { USER_REPOSITORIES } from "../../ioc/UserTypes";
import { IGetUserController } from "./IGetController";

@injectable()
export class GetUserController extends BaseController implements IGetUserController {

    @inject(USER_REPOSITORIES.IUserRepository)
    private readonly _userRepository: IUserRepository;

    async process(req: Request, res: Response): Promise<Response> {
        const users: IUser[] = await this._userRepository.getMany();

        return res.json(SuccessResponse.Ok(users));
    }
}
