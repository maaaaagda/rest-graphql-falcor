// import {  getAllDietOrders } from "../requests/rest/DietOrderRequests";
// import {  getDailyDiet } from "../requests/rest/DailyDietRequests";
// import {  getMealById } from "../requests/rest/MealRequests";
// import {  getProducts } from "../requests/rest/ProductRequests";
// import {  getDietById } from "../requests/rest/DietRequests";

// async function seed() {
//     try {
//     console.log((await getAllDietOrders()).data);
//     console.log(await getDailyDiet("2020-03-27", "16cfe8b0-6df9-11ea-8f8b-41bd9c6f65b2"));
//     console.log(await getProducts("apple"));
//     console.log((await getDailyDiet("2020-04-05", "de6341f0-71ce-11ea-9daa-8b79823ef638")).data);
//     console.log((await getDietById("de6341f0-71ce-11ea-9daa-8b79823ef638")).data);
//     console.log((await getMealById("82ec4ba0-71d8-11ea-87cc-bd1ac4b4cb47")).data);
//     } catch (err) {
//         console.log(err);
//         console.log(err?.response?.body);
//     }
// }

// seed();
