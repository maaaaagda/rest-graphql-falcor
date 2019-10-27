import { BaseRepository } from "../../../core/repository/BaseRepository";
import { IUser } from "../model/User";

export class UserRepository extends BaseRepository<IUser> {
    protected _model: string = "User";
}
