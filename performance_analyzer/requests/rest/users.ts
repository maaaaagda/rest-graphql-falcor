import { initialMetricsResponse, recalculateMetrics } from "./../helpers";
import { API_URL } from "../../common";
import got from "../got";
import { generateRandomUser, generateTestUser } from "../../generate_data/users";
import { MetricsResponse } from "../../types/Response";

const options: any = {
  url: API_URL + "users",
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
};

export const addUsers = async (nrOfUsers = 10, nrOfAdmins = 1, nrOfDietitians = 1): Promise<MetricsResponse> => {
    let i: number = 0;
    let metrics = initialMetricsResponse;
    options.method = "POST";
    options.data = generateTestUser();
    metrics = recalculateMetrics(metrics, await got(options));

    while (i < nrOfUsers) {
        options.data = generateRandomUser();
        metrics = recalculateMetrics(metrics, await got(options));
        i = i + 1;
    }
    i = 0;
    while (i < nrOfAdmins - 1 ) {
        options.data = generateRandomUser("admin");
        metrics = recalculateMetrics(metrics, await got(options));
        i = i + 1;
    }
    i = 0;
    while (i < nrOfDietitians) {
        options.data = generateRandomUser("dietitian");
        metrics = recalculateMetrics(metrics, await got(options));
        i = i + 1;
    }
    return metrics;
};

export const getAllUsers = async (token: string): Promise<MetricsResponse> => {
    options.headers = {
        ...got.defaults.options.headers,
        authorization: `Bearer ${token}`
    };
    const res = await got(options);
    return {
        timings: res.timings.phases,
        size: res.body.length,
        data: JSON.parse(res.body)
    };
};
