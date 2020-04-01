import { initialIMetricsResponse, recalculateMetrics } from "../helpers";
import got from "../got";
import { generateRandomUser, generateTestUser } from "../../generate_data/users";
import { IMetricsResponse } from "../../types/IMetricsResponsee";
import { Options, Response } from "got";
import { IUserRequests } from "../IUserRequests";
import { RESTRequestsBase } from "./RESTRequestsBase";

export class RESTUserRequests extends RESTRequestsBase implements IUserRequests {
    public addUsers = async ({ nrOfUsers = 10, nrOfAdmins = 1, nrOfDietitians = 1, insertTestUser = false} = {})
    : Promise<IMetricsResponse> => {
        let i: number = 0;
        let metrics = initialIMetricsResponse;
        const options = {
            url: this.apiUrl + "users",
            method: "POST",
            body: ""
        };

        if (insertTestUser) {
            options.body = JSON.stringify(generateTestUser());
            metrics = recalculateMetrics(metrics, await got(options));
        }

        while (i < nrOfUsers) {
            options.body = JSON.stringify(generateRandomUser());
            metrics = recalculateMetrics(metrics, await got(options));
            i = i + 1;
        }
        i = 0;
        while (i < nrOfAdmins - 1 ) {
            options.body = JSON.stringify(generateRandomUser("admin"));
            metrics = recalculateMetrics(metrics, await got(options));
            i = i + 1;
        }
        i = 0;
        while (i < nrOfDietitians) {
            options.body = JSON.stringify(generateRandomUser("dietitian"));
            metrics = recalculateMetrics(metrics, await got(options));
            i = i + 1;
        }
        return metrics;
    }

    public getAllUsers = async (): Promise<Response<string>> => {
        const options: Options = {
            url: this.apiUrl + "users"
        };
        
        return got(options);
    }
}
