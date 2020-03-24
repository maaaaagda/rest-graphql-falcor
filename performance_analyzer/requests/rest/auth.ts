import { MetricsResponse } from "./../../types/Response";
import { TEST_USER } from "./../../common";
import { API_URL } from "../../common";
import got from "../got";
const options: any = {
    url: API_URL + "auth/login",
    method: "POST"
  };

export const login = async (): Promise<MetricsResponse> => {
    options.body = JSON.stringify({
        email: TEST_USER.email,
        password: TEST_USER.password
    });
    const res = await got(options);
    return {
        timings: res.timings.phases,
        size: res.body.length,
        data: JSON.parse(res.body)
    };
};