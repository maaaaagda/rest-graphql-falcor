import faker from "faker";

const deliveryTimes = ["05.00", "06:00", "07:00", "08:00", "09.00"];
const MAX_NR_OF_ORDER_DATES = 20;

export const generateRandomDietOrder = (dietIds: string[], kcalOptions: number[], userId: string) => {
    return {
        userId,
        dietId: dietIds[Math.floor(Math.random() * dietIds.length)],
        dates: getRandomDietOrderDates(),
        deliveryAddress: faker.fake("{{address.streetAddress}}, {{address.zipCode}} {{address.city}}"),
        deliveryTime: deliveryTimes[Math.floor(Math.random() * deliveryTimes.length)],
        kcal: kcalOptions[Math.floor(Math.random() * kcalOptions.length)],
    };
};

const getRandomDietOrderDates = () => {
    const nrOfDates = Math.ceil(Math.random() * MAX_NR_OF_ORDER_DATES);
    let i = 0;
    const dates = new Set();
    while (i < nrOfDates) {
        dates.add(faker.date.future());
        i += 1;
    }
    return Array.from(dates);
};
