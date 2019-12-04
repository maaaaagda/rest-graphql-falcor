import { injectable } from "inversify";
import { Model, Schema } from "mongoose";
import { BaseRepository } from "../../../core/repository/BaseRepository";
import { IUser } from "../model/User";
import { userSchema } from "./../model/UserSchema";
import { IUserRepository } from "./IUserRepository";

@injectable()
export class UserRepository extends BaseRepository<IUser>
  implements IUserRepository {
  protected model: string = "User";
  protected schema: Schema<IUser> = userSchema;

  public async getUserAuthData(email: string): Promise<IUser> {
    const model: Model<IUser> = await this.getModel();
    return model.findOne({ email }).select(["password", "role"]);
  }
}
