import faker from "faker";

const MIN_DIET_COST = 40;
const MAX_DIET_COST = 150;

const DIETS = [
    "DASH Diet",
    "MIND Diet",
    "TLC Diet (tie)",
    "Weight Watchers",
    "Mayo Clinic",
    "Fertility",
    "Mediterranean (tie)",
    "Volumetrics (tie)",
    "Flexitarian",
    "Jenny Craig",
    "Biggest Loser",
    "Ornish (tie)",
    "Vegetarian",
    "Traditional Asian (tie)",
    "Slim Fast",
    "Sport",
    "Anti-Inflammatory (tie)",
    "HMR",
    "Flat Belly",
    "Nutrisystem (tie)",
    "Vegan",
    "Engine 2",
    "South Beach",
    "Abs (tie)",
    "Eco-Atkins",
    "Zone",
    "Glycemic-Index (tie)",
    "Macrobiotic",
    "Medifast (tie)",
    "Supercharged Hormone",
    "Acid Alkaline (tie)",
    "Fast",
    "Body Reset (tie)",
    "Raw food",
    " Atkins (tie)",
    "Dukan",
    "Paleo (tie)",
    "Whole 30"
];

export const generateRandomDiet = () => {
    return {
        name: DIETS[Math.floor(Math.random() * DIETS.length)],
        dailyCost: getRandomDietPrice(),
        photoUrl: faker.image.imageUrl()
    };
};

function getRandomDietPrice() {
    return (Math.random() * (MIN_DIET_COST - MAX_DIET_COST) + MAX_DIET_COST).toPrecision(4);
}
