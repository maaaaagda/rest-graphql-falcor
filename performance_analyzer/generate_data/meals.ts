import { capitalize } from "./../common";
import faker from "faker";
import _ from "lodash";

const MIN_WEIGHT = 50;
const MAX_WEIGHT = 500;
const MAX_NR_OF_INGREDIENTS = 10;

export const generateRandomMeal = (productIds) => {

    const ingredients = _.uniqBy(generateIngredients(productIds), "productId");
    return {
        name: capitalize(faker.lorem.words()),
        ingredients,
        recipe: faker.lorem.paragraph(),
        photo: faker.image.imageUrl()
    };
};

const generateIngredients = (productIds) => {
    const nrOfIngredients = Math.ceil(Math.random() * MAX_NR_OF_INGREDIENTS);
    let i = 0;
    const ingredients = [];
    while (i < nrOfIngredients) {
        ingredients.push(generateIngredient(productIds));
        i += 1;
    }
    return ingredients;
};

const generateIngredient = (productIds) => {
    return {
        productId: productIds[Math.floor(Math.random() * productIds.length)],
        weight: getRandomWeight()
    };
};

const getRandomWeight = () => {
    return Math.floor(Math.random() * (MIN_WEIGHT - MAX_WEIGHT) + MAX_WEIGHT);
};
