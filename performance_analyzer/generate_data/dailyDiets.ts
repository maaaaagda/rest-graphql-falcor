const NR_OF_MEALS_IN_A_DAY = 5;

export const generateDailyDiet = (date: string, dietId: string, mealIds: number) => {
    const meals = getRandomMealIds(mealIds);
    return {
        dietId,
        date,
        dailyMeals: {
            breakfast: meals.shift(),
            morningSnack: meals.shift(),
            lunch: meals.shift(),
            afternoonSnack: meals.shift(),
            dinner: meals.shift()
        }
    };
};

const getRandomMealIds = (mealIds) => {
    const ids = new Set();
    while (ids.size < NR_OF_MEALS_IN_A_DAY) {
        ids.add(mealIds[Math.floor(Math.random() * mealIds.length)]);
    }
    return Array.from(ids);
};
