import { AuthController } from "../controller/AuthController";
const authController = new AuthController();

export const authRoutes: any = [
    {
        route: "login",
        call: async (callPath, args, pathSet, paths) => {
        const {email, password} = args;
        const loginData: {token: string } = await authController.login(email, password);
        return pathSet.map((key) => {
                return { path: ["token"], value: loginData.token};
            });
        }
    }
];
