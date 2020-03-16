import { userRoutes } from "../api/user/falcor/userRoutes";
import { productRoutes } from "../api/product/falcor/productRoutes";
import { mealRoutes } from "../api/meal/falcor/mealRoutes";
import { authRoutes } from "./../api/auth/falcor/authRoutes";

export const routes: object[] = [
    ...userRoutes,
    ...productRoutes,
    ...mealRoutes,
    ...authRoutes
];
