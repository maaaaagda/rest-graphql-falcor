import { capitalize } from "./../common";
import faker from "faker";

const MIN_DIET_COST = 40;
const MAX_DIET_COST = 150;

export const generateRandomDiet = () => {
    return {
        name: capitalize(faker.lorem.words()),
        dailyCost: getRandomDietPrice(),
        photoUrl: faker.image.imageUrl()
    };
};

const getRandomDietPrice = () => {
    return (Math.random() * (MIN_DIET_COST - MAX_DIET_COST) + MAX_DIET_COST).toPrecision(4);
};
