import { IUser } from "./IUser";
export interface IUserGenerator {
    generateRandomUser(role?: string): IUser;
    generateTestUser(): IUser;
}
