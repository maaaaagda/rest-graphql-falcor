import { GraphQLUserRequests } from "./../requests/graphql/UserRequests";

async function run() {
    try {
        console.log((await new GraphQLUserRequests().getAllUsers()));
    } catch (err) {
        console.log(err);
        console.log(err?.response?.body);
    }
}

run();
