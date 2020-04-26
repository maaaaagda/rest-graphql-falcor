import { Response } from "got";
import { IAuthRequests } from "../IAuthRequests";
import { TEST_USER } from "../../common";
import { API_URL } from "../../common";
import got from "../got";
import { RESTRequestsBase } from "./RESTRequestsBase";

export class RESTAuthRequests extends RESTRequestsBase implements IAuthRequests {
    public login = async (email?: string, password?: string): Promise<Response<string>> => {
        const options = {
            url: this.apiUrl + "auth/login",
            method: "POST",
            body: JSON.stringify({
                email: email || TEST_USER.email,
                password: password || TEST_USER.password
            })
        };
        return got(options);
    }
}
