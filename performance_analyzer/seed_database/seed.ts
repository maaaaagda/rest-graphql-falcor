import { login } from "./../requests/rest/auth";
import { addUsers, getAllUsers } from "../requests/rest/users";

async function seed() {
    try {
    await addUsers();
    const token = (await login()).data.message.token;
    getAllUsers(token);
    } catch (err) {
        console.log(err);
    }
}

seed();
