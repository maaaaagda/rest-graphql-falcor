import { userRoutes } from "../api/user/falcor/userRoutes";
import { productRoutes } from "../api/product/falcor/productRoutes";

export const routes: object[] = [
    ...userRoutes,
    ...productRoutes
];
