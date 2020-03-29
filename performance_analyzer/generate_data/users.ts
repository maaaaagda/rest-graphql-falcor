import faker from "faker";
import { TEST_USER } from "../common";

export const generateRandomUser = (role = "user") => {
    return {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role,
        phone: faker.phone.phoneNumber(),
        city: faker.address.city(),
    };
};

export const generateTestUser = () => {
    return {
        name: TEST_USER.name,
        email: TEST_USER.email,
        password: TEST_USER.password,
        role: "admin",
        phone: faker.phone.phoneNumber(),
        city: faker.address.city(),
    };
};
