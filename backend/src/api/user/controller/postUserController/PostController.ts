import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IAuthenticator } from "../../../../core/auth/IAuthenticator";
import { IValidator } from "../../../../core/validator/IValidator";
import { TYPES } from "../../../../ioc/types";
import { SuccessResponse } from "../../../../response/SuccessResponse";
import { USER_TYPES } from "../../ioc/UserTypes";
import { IUser } from "../../model/User";
import { userPostSchema } from "../../schema/post/postUser";
import { IPostUserController } from "./IPostController";
import { IUserService } from "../../service/IUserService";

@injectable()
export class PostUserController implements IPostUserController {

    @inject(TYPES.IValidator)
    protected readonly _validator: IValidator;

    @inject(USER_TYPES.IUserService)
    private readonly _userService: IUserService;

    @inject(TYPES.IAuthenticator)
    private readonly _authenticator: IAuthenticator;

    public async process(req: Request, res: Response): Promise<Response> {
        this._authenticator.authenticate(req.headers.authorization);
        this._validator.validate(req.body, userPostSchema);
        const user: IUser = await this._userService.postUser(req.body);

        return res.json(SuccessResponse.Created(user));
    }
}
