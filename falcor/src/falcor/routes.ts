import { userRoutes } from "../api/user/falcor/userRoutes";
import { productRoutes } from "../api/product/falcor/productRoutes";
import { mealRoutes } from "../api/meal/falcor/mealRoutes";

export const routes: object[] = [
    ...userRoutes,
    ...productRoutes,
    ...mealRoutes
];
