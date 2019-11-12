import { IUser } from "../model/User";

export interface IUserService {
  getUsers(): Promise<IUser[]>;
  postUser(userParams: any): Promise<IUser>;
  putUser(id: string, userParams: any): Promise<IUser>;
}
