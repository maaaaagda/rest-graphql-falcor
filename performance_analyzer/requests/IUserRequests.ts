import { Response } from "got";

export interface IUserRequests {
    getAllUsers(nrOfUsers?: number): Promise<Response<string>>;
    addUser(user): Promise<Response<string>>;
}
