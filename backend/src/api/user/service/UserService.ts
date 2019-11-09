import { inject, injectable } from "inversify";
import { USER_REPOSITORIES } from "../ioc/UserTypes";
import { IUserRepository } from "../repository/IUserRepository";
import { IUser } from "../model/User";
import { BadRequestError } from "../../../core/error/BadRequestError";

@injectable()
export class UserService {

  @inject(USER_REPOSITORIES.IUserRepository)
  private readonly _dietRepository: IUserRepository;

  public async getUsers(): Promise<IUser[]> {
    return await this._dietRepository.getMany();
  }

  public async postUser(dietParams: IUser) {
    return await this._dietRepository.insertOne(dietParams);
  }

  public async putUser(id: string, dietParams: IUser) {
    const dietToModify: IUser = await this._dietRepository.getOne({
      _id: id
    });
    if (dietToModify) {
     const updated: IUser = await this._dietRepository.updateOneById(id, {
        $set: dietParams
      });
     return updated;
    }
    throw new BadRequestError();
  }
}
