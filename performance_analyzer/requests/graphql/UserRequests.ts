import { initialIMetricsResponse, recalculateMetrics } from "../helpers";
import { API_URL } from "../../common";
import got from "../got";
import { IMetricsResponse } from "../../types/IMetricsResponsee";
import { Options } from "got";
import { IUserRequests } from "../IUserRequests";

export class GraphQLUserRequests implements IUserRequests {

    public getAllUsers = async (token?: string): Promise<IMetricsResponse> => {
        const query = `
            query {
                users {
                    name
                    email
                }
            }
        `;
        const options: Options = {
            url: API_URL,
            body: JSON.stringify({query}),
            method: "POST"
        };
        if (token) {
            options.headers = {
            ...got.defaults.options.headers,
            authorization: `Bearer ${token}`
            };
        }

        return recalculateMetrics(initialIMetricsResponse, await got(options), true);
    }
}
