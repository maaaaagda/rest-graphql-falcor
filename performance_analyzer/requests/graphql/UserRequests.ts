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
}
