import { API_URL } from "./../../common";
import axios, { AxiosRequestConfig } from "axios";
import { generateRandomUser, generateTestUser } from "../../generate_data/users";

const options: AxiosRequestConfig = {
  url: API_URL + "users",
  method: "POST",
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
};

export const addUsers = async (nrOfUsers = 10, nrOfAdmins = 1, nrOfDietitians = 1) => {
    let i: number = 0;
    let size: number = 0;
    const startTime: number = Date.now();

    options.data = generateTestUser();
    const res = await axios(options);
    size = size + parseInt(res.headers["content-length"], 10);

    while (i < nrOfUsers) {
        options.data = generateRandomUser();
        const res = await axios(options);
        size = size + parseInt(res.headers["content-length"], 10);
        i = i + 1;
    }
    i = 0;
    while (i < nrOfAdmins - 1 ) {
        options.data = generateRandomUser("admin");
        const res = await axios(options);
        size = size + parseInt(res.headers["content-length"], 10);
        i = i + 1;
    }
    i = 0;
    while (i < nrOfDietitians) {
        options.data = generateRandomUser("dietitian");
        const res = await axios(options);
        size = size + parseInt(res.headers["content-length"], 10);
        i = i + 1;
    }
    return {
        size,
        time: Date.now() - startTime
    };
};
