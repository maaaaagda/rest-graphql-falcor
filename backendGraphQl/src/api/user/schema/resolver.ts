import { injectable, inject } from "inversify";
import { IAuthenticator } from "../../../core/auth/IAuthenticator";
import { TYPES } from "../../../ioc/types";
import { IUser } from "../model/User";
import { IUserService } from "../service/IUserService";
import { USER_TYPES } from "../ioc/UserTypes";
import { IGetUserController } from '../controller/getUserController/IGetController';

@injectable()
export class GetUserController implements IGetUserController {

    @inject(USER_TYPES.IUserService)
    private readonly _userService: IUserService;

    @inject(TYPES.IAuthenticator)
    private readonly _authenticator: IAuthenticator;

    public readonly users = async (_: void, args: void): Promise<IUser> => {
        const users: IUser[] = await this._userService.getUsers();
        return users[0]
    }
}

// const users = GetUserController.users;
// export const users = (_: void, args: void): IUser => {
//   return {    
//     _id: "1",
//     name: "magda",
//     email: "magda@gmail.com",
//     password: "pass",
//     role: UserRole.ADMIN
//   }
// }
