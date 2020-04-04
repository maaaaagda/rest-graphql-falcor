import { IUser } from "./../../generate_data/Users/IUser";
import got from "../got";
import { Options, Response } from "got";
import { IUserRequests } from "../IUserRequests";
import { GraphQLRequestsBase } from "./GraphQLRequestsBase";

export class GraphQLUserRequests extends GraphQLRequestsBase implements IUserRequests {

    public getAllUsers = async (): Promise<Response<string>> => {
        const query = `
            query {
                users {
                    name
                    email
                }
            }
        `;
        const options: Options = {
            url: this.apiUrl,
            body: JSON.stringify({query}),
            method: "POST"
        };

        return got(options);
    }

    public addUser(user: IUser): Promise<Response<string>> {
        const query = `
            mutation ($user: AddUser!) {
                addUser(user: $user) { 
                    _id
                }
            }
        `;
        const variables = {
            user
        };
        
        const options: Options = {
            url: this.apiUrl,
            body: JSON.stringify({query, variables}),
            method: "POST"
        };

        return got(options);
    }
}
