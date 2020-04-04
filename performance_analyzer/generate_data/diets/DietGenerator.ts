import { IDietGenerator } from "./IDietGenerator";
import { capitalize } from "./../../common";
import faker from "faker";
import { IDiet } from "./IDiet";

const MIN_DIET_COST = 40;
const MAX_DIET_COST = 150;

export class DietGenerator implements IDietGenerator {

    public generateRandomDiet(): IDiet {
        return {
            name: capitalize(faker.lorem.words()),
            dailyCost: this.getRandomDietPrice(),
            photoUrl: faker.image.imageUrl()
        };
    }

    private getRandomDietPrice(): number {
        return parseFloat((Math.random() * (MIN_DIET_COST - MAX_DIET_COST) + MAX_DIET_COST).toPrecision(4));
    }

}
