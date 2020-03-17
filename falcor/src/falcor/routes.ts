import { userRoutes } from "../api/user/falcor/userRoutes";
import { productRoutes } from "../api/product/falcor/productRoutes";
import { mealRoutes } from "../api/meal/falcor/mealRoutes";
import { authRoutes } from "./../api/auth/falcor/authRoutes";
import { dietRoutes } from "../api/diet/falcor/dietRoutes";

export const routes: object[] = [
    ...userRoutes,
    ...productRoutes,
    ...mealRoutes,
    ...authRoutes,
    ...dietRoutes
];
