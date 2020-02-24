import { AuthController } from "../controller/AuthController";
const authController = new AuthController();

export const AuthResolvers = {
  Query: {},
  Mutation: {
    login: authController.login
  }
};
