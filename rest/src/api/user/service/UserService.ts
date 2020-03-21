import { IUserService } from "./IUserService";
import { inject, injectable } from "inversify";
import { USER_REPOSITORIES } from "../ioc/UserTypes";
import { IUserRepository } from "../repository/IUserRepository";
import { IUser } from "../model/User";
import { BadRequestError } from "../../../core/error/BadRequestError";
import { TYPES } from "../../../ioc/types";
import { IAuthenticator } from "../../../core/auth/IAuthenticator";

@injectable()
export class UserService implements IUserService {
  @inject(USER_REPOSITORIES.IUserRepository)
  private readonly _userRepository: IUserRepository;

  @inject(TYPES.IAuthenticator)
  private readonly _authenticator: IAuthenticator;

  public async getUsers(): Promise<IUser[]> {
    return await this._userRepository.getMany();
  }

  public async postUser(dietParams: IUser) {
    const encodedPassword = await this._authenticator.encodePassword(
      dietParams.password
    );
    return await this._userRepository.insertOne({
      ...dietParams,
      password: encodedPassword
    } as IUser);
  }

  public async putUser(id: string, dietParams: IUser) {
    const dietToModify: IUser = await this._userRepository.getOne({
      _id: id
    });
    if (dietToModify) {
      const updated: IUser = await this._userRepository.updateOneById(id, {
        $set: dietParams
      });
      return updated;
    }
    throw new BadRequestError();
  }
}
