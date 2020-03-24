import { initialMetricsResponse, recalculateMetrics } from "./../helpers";
import { API_URL } from "../../common";
import got from "../got";
import { generateRandomUser, generateTestUser } from "../../generate_data/users";
import { MetricsResponse } from "../../types/Response";

export const addUsers = async ({ nrOfUsers = 10, nrOfAdmins = 1, nrOfDietitians = 1, insertTestUser = false} = {})
: Promise<MetricsResponse> => {
    let i: number = 0;
    let metrics = initialMetricsResponse;
    const options = {
        url: API_URL + "users",
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
};

export const getAllUsers = async (token: string): Promise<MetricsResponse> => {
    const options = {
        url: API_URL + "users",
        headers: {
        ...got.defaults.options.headers,
        authorization: `Bearer ${token}`
        }
    };
    const res = await got(options);
    return {
        timings: res.timings.phases,
        size: res.body.length,
        data: JSON.parse(res.body)
    };
};
