import { addDiets } from "./../requests/rest/diets";
import { addUsers } from "../requests/rest/users";

async function seed() {
    try {
    await addUsers();
    await addDiets();
    } catch (err) {
        console.log(err);
        console.log(err?.response?.body);
    }
}

seed();
