import { IUser } from "../../generate_data/users/IUser";
import got from "../got";
import { Options, Response } from "got";
import { IUserRequests } from "../IUserRequests";
import { RESTRequestsBase } from "./RESTRequestsBase";

export class RESTUserRequests extends RESTRequestsBase implements IUserRequests {

    public addUser(user: IUser): Promise<Response<string>> {
        const options = {
            url: this.apiUrl + "users",
            method: "POST",
            body: JSON.stringify(user)
        };
        return got(options);
    }

    public getAllUsers = async (): Promise<Response<string>> => {
        const options: Options = {
            url: this.apiUrl + "users"
        };
        
        return got(options);
    }
}
