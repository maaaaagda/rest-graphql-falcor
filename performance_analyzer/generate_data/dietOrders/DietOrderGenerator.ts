import { IDietOrderGenerator } from "./IDietOrderGenerator";
import { IDietOrder } from "./IDietOrder";
import faker from "faker";

const deliveryTimes = ["05.00", "06:00", "07:00", "08:00", "09.00"];
const MAX_NR_OF_ORDER_DATES = 20;

export class DietOrderGenerator implements IDietOrderGenerator {

    public generateRandomDietOrder(dietIds: string[], kcalOptions: number[]): IDietOrder {
        return {
            dietId: dietIds[Math.floor(Math.random() * dietIds.length)],
            dates: this.getRandomDietOrderDates(),
            deliveryAddress: faker.fake("{{address.streetAddress}}, {{address.zipCode}} {{address.city}}"),
            deliveryTime: deliveryTimes[Math.floor(Math.random() * deliveryTimes.length)],
            kcal: kcalOptions[Math.floor(Math.random() * kcalOptions.length)],
        };
    }

    private getRandomDietOrderDates(): string[] {
        const nrOfDates = Math.ceil(Math.random() * MAX_NR_OF_ORDER_DATES);
        let i = 0;
        const dates = new Set();
        while (i < nrOfDates) {
            dates.add(faker.date.future());
            i += 1;
        }
        return Array.from(dates) as string[];
    }
}
