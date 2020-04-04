import { FalcorUserRequests } from "./../requests/falcor/UserRequests";
import { UserGenerator } from "../generate_data/users/UserGenerator";
import { GraphQLUserRequests } from "./../requests/graphql/UserRequests";

async function run() {
    try {
        console.log((await new FalcorUserRequests().addUser(new UserGenerator().generateRandomUser())));
    } catch (err) {
        console.log(err);
        console.log(err?.response?.body);
    }
}

run();
