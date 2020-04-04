import { IUserGenerator } from "./../../generate_data/Users/IUserGenerator";
import { UserGenerator } from "./../../generate_data/Users/UserGenerator";
import { IUser } from "./../../generate_data/Users/IUser";
import got from "../got";
import { Options, Response } from "got";
import { IUserRequests } from "../IUserRequests";
import { RESTRequestsBase } from "./RESTRequestsBase";

export class RESTUserRequests extends RESTRequestsBase implements IUserRequests {
    private readonly _userGenerator: IUserGenerator = new UserGenerator();

    public addUsers = async ({ nrOfUsers = 10, nrOfAdmins = 1, nrOfDietitians = 1, insertTestUser = false} = {})
    : Promise<void> => {
        let i: number = 0;
        const options = {
            url: this.apiUrl + "users",
            method: "POST",
            body: ""
        };

        if (insertTestUser) {
            options.body = JSON.stringify(this._userGenerator.generateTestUser());
            await got(options);
        }

        while (i < nrOfUsers) {
            options.body = JSON.stringify(this._userGenerator.generateRandomUser());
            await got(options);
            i = i + 1;
        }
        i = 0;
        while (i < nrOfAdmins - 1 ) {
            options.body = JSON.stringify(this._userGenerator.generateRandomUser("admin"));
            await got(options);
            i = i + 1;
        }
        i = 0;
        while (i < nrOfDietitians) {
            options.body = JSON.stringify(this._userGenerator.generateRandomUser("dietitian"));
            await got(options);
            i = i + 1;
        }
    }

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
