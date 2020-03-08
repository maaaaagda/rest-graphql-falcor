import { userAddSchema } from "./../schema/post/addUser";
import { IValidator } from "../../../core/validator/IValidator";
import { injectable, inject, Container } from "inversify";
import { IAuthenticator } from "../../../core/auth/IAuthenticator";
import { TYPES } from "../../../ioc/types";
import { IUser } from "../model/User";
import { IUserService } from "../service/IUserService";
import { USER_TYPES } from "../ioc/UserTypes";
import getContainer from "../ioc/inversify.config";
import { Context } from "vm";

@injectable()
export class UserController {

    private readonly _container: Container = getContainer();

    @inject(USER_TYPES.IUserService)
    private readonly _userService: IUserService = this._container.get(
        USER_TYPES.IUserService
      );

    @inject(TYPES.IAuthenticator)
    private readonly _authenticator: IAuthenticator = this._container.get(
        TYPES.IAuthenticator
      );

    @inject(TYPES.IValidator)
    private readonly _validator: IValidator = this._container.get(TYPES.IValidator);

    public readonly getUsers = async (): Promise<IUser[]> => {
      //this._authenticator.authenticate(ctx.token);  
      const users: IUser[] = await this._userService.getUsers();
        return users;
    }

    public readonly addUserr = async (parent, args: { user: IUser }, ctx: Context, info): Promise<IUser[]> => {
        this._authenticator.authenticate(ctx.token);
        this._validator.validate(args.user, userAddSchema);
        const user: IUser = await this._userService.addUser(args.user);
        return;
    }
}
