import { IUser } from "../model/User";

export interface IUserService {
  getUsers(): Promise<IUser[]>;
  addUser(userParams: any): Promise<IUser>;
  updateUser(id: string, userParams: any): Promise<IUser>;
}
