import { IIngredient } from "./IIngredient";
import { capitalize } from "./../../common";
import faker from "faker";
import _ from "lodash";
import { IMeal } from "./IMeal";

const MIN_WEIGHT = 50;
const MAX_WEIGHT = 500;
const MAX_NR_OF_INGREDIENTS = 10;

export class MealGenerator {
    public generateRandomMeal(productIds: string[]): IMeal {

        const ingredients = _.uniqBy(this.generateIngredients(productIds), "productId");
        return {
            name: capitalize(faker.lorem.words()),
            ingredients,
            recipe: faker.lorem.paragraph(),
            photo: faker.image.imageUrl()
        };
    }

    private generateIngredients(productIds: string[]): IIngredient[] {
        const nrOfIngredients = Math.ceil(Math.random() * MAX_NR_OF_INGREDIENTS);
        let i = 0;
        const ingredients = [];
        while (i < nrOfIngredients) {
            ingredients.push(this.generateIngredient(productIds));
            i += 1;
        }
        return ingredients;
    }

    private generateIngredient(productIds: string[]): IIngredient {
        return {
            productId: productIds[Math.floor(Math.random() * productIds.length)],
            weight: this.getRandomWeight()
        };
    }

    private getRandomWeight(): number {
        return Math.floor(Math.random() * (MIN_WEIGHT - MAX_WEIGHT) + MAX_WEIGHT);
    }

}
