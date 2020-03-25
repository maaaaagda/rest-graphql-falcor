import { addProducts } from "./../requests/rest/products";
import { addDiets } from "./../requests/rest/diets";
import { addUsers } from "../requests/rest/users";

async function seed() {
    try {
    await addUsers();
    await addDiets();
    await addProducts();
    } catch (err) {
        console.log(err);
        console.log(err?.response?.body);
    }
}

seed();
