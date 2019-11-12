import { inject, injectable } from "inversify";
import { AuthenticationError } from "../../../core/error/AuthenticationError";
import { UserRole } from "../../user/model/UserRole";
import { TYPES } from "../../../ioc/types";
import { IAuthenticator } from "../../../core/auth/IAuthenticator";
import { USER_REPOSITORIES } from "../../user/ioc/UserTypes";
import { IUserRepository } from "../../user/repository/IUserRepository";
import { IUser } from "../../user/model/User";

@injectable()
export class AuthService {

  @inject(USER_REPOSITORIES.IUserRepository)
  private readonly _userRepository: IUserRepository;

  @inject(TYPES.IAuthenticator)
  private readonly _authenticator: IAuthenticator;

  public async login(email: string, password: string): Promise<string> {
    const user: IUser = await this._userRepository.getOne({
      email,
      password
    });

    if (!user) {
      throw new AuthenticationError("Wrong credentials sent");
    }
    return Promise.resolve(this._authenticator.generateJWTToken(user.role as UserRole));
  }
}
