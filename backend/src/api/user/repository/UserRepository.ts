import { BaseRepository } from "../../../core/repository/BaseRepository";
import { IUser } from "../model/User";
import { injectable } from "inversify";
import { IUserRepository } from "./IUserRepository";
import { userSchema } from "./../model/UserSchema";
import { Schema } from "mongoose";

@injectable()
export class UserRepository extends BaseRepository<IUser> implements IUserRepository {
    protected model: string = "User";
    protected schema: Schema<IUser> = userSchema;
}
