import { IUser } from "../../generate_data/users/IUser";
import got from "../got";
import { Options, Response } from "got";
import { IUserRequests } from "../IUserRequests";
import { FalcorRequestsBase } from "./FalcorRequestsBase";

export class FalcorUserRequests extends FalcorRequestsBase implements IUserRequests {

    public getAllUsers = async (): Promise<Response<string>> => {
        const options: Options = {
            url: `${this.apiUrl}?paths=[["users",["name","_id"]]]&method=get`
        };

        return got(options);
    }

    public addUser(user: IUser): Promise<Response<string>> {
        const options: Options = {
            url: this.apiUrl,
            body: JSON.stringify(
                {
                    method: "call",
                    callPath: JSON.stringify(["user", "add"]),
                    arguments: JSON.stringify(user)
                }
            ),
            method: "POST"
        };

        return got(options);
    }
}
