import { injectable, inject, Container } from "inversify";
import { IAuthenticator } from "../../../core/auth/IAuthenticator";
import { TYPES } from "../../../ioc/types";
import { IUser } from "../model/User";
import { IUserService } from "../service/IUserService";
import { USER_TYPES } from "../ioc/UserTypes";
import { IGetUserController } from "../controller/getUserController/IGetController";
import getContainer from "../ioc/inversify.config";

@injectable()
export class UserResolver implements IGetUserController {

    private readonly _container: Container = getContainer();

    @inject(USER_TYPES.IUserService)
    private readonly _userService: IUserService = this._container.get(
        USER_TYPES.IUserService
      );

    @inject(TYPES.IAuthenticator)
    private readonly _authenticator: IAuthenticator;

    public readonly users = async (_: void, args: void): Promise<IUser[]> => {
        const users: IUser[] = await this._userService.getUsers();
        return users;
    }
}
