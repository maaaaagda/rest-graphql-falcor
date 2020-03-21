import { addUsers } from "./addUsers";

async function seed() {
    const performanceData = await addUsers();
    console.log(performanceData);
}

seed();
