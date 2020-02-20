import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IAuthenticator } from "../../../../core/auth/IAuthenticator";
import { TYPES } from "../../../../ioc/types";
import { SuccessResponse } from "../../../../response/SuccessResponse";
import { IUser } from "../../model/User";
import { IGetUserController } from "./IGetController";
import { IUserService } from "../../service/IUserService";
import { USER_TYPES } from "../../ioc/UserTypes";

@injectable()
export class GetUserController implements IGetUserController {

    @inject(USER_TYPES.IUserService)
    private readonly _userService: IUserService;

    @inject(TYPES.IAuthenticator)
    private readonly _authenticator: IAuthenticator;

    public async process(req: Request, res: Response): Promise<Response> {
        this._authenticator.authenticate(req.headers.authorization);
        const users: IUser[] = await this._userService.getUsers();

        return res.json(SuccessResponse.Ok(users));
    }
}
