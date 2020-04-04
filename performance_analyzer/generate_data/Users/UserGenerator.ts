import { faker } from "faker";
import { IUser } from "./IUser";
import { IUserGenerator } from "./IUserGenerator";
import { TEST_USER } from "../../common";

export class UserGenerator implements IUserGenerator {
    public generateRandomUser(role = "user"): IUser {
        return {
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            role,
            phone: faker.phone.phoneNumber(),
            city: faker.address.city(),
        };
    }
    
    public generateTestUser(): IUser {
        return {
            name: TEST_USER.name,
            email: TEST_USER.email,
            password: TEST_USER.password,
            role: "admin",
            phone: faker.phone.phoneNumber(),
            city: faker.address.city(),
        };
    }
}
