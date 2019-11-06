import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IAuthenticator } from "../../../../core/auth/IAuthenticator";
import { TYPES } from "../../../../ioc/types";
import { SuccessResponse } from "../../../../response/SuccessResponse";
import { USER_REPOSITORIES } from "../../ioc/UserTypes";
import { IUser } from "../../model/User";
import { IUserRepository } from "../../repository/IUserRepository";
import { IGetUserController } from "./IGetController";

@injectable()
export class GetUserController implements IGetUserController {

    @inject(TYPES.IAuthenticator)
    private readonly _authenticator: IAuthenticator;

    @inject(USER_REPOSITORIES.IUserRepository)
    private readonly _userRepository: IUserRepository;

    public async process(req: Request, res: Response): Promise<Response> {
        this._authenticator.authenticate(req.headers.authorization);
        const users: IUser[] = await this._userRepository.getMany();

        return res.json(SuccessResponse.Ok(users));
    }
}
