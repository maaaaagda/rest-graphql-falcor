export enum DatabaseSize {
    SMALL = "SMALL",
    MEDIUM = "MEDIUM",
    LARGE = "LARGE"
}

export const COLLECTION_SIZES: any  = {
    meals: {
        SMALL: 500,
        MEDIUM: 1000,
        LARGE: 2000
    },
    diets: {
        SMALL: 5,
        MEDIUM: 10,
        LARGE: 20
    },
    users: {
        SMALL: 50,
        MEDIUM: 200,
        LARGE: 1000
    },
    dailyDiets: {
        SMALL: 500,
        MEDIUM: 1000,
        LARGE: 5000
    },
    dietOrders: {
        SMALL: 100,
        MEDIUM: 800,
        LARGE: 4000
    },
    products: {
        SMALL: 2000,
        MEDIUM: 2000,
        LARGE: 2000
    }
};
