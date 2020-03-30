import { UserRequests } from "./../requests/graphql/UserRequests";

async function run() {
    try {
        console.log((await new UserRequests().getAllUsers()).data);
    } catch (err) {
        console.log(err);
        console.log(err?.response?.body);
    }
}

run();
