import { IResolver } from "../../../core/graphql/IResolver";
import { AuthController } from "../controller/AuthController";
const authController = new AuthController();

export const AuthResolvers: IResolver = {
  Query: {},
  Mutation: {
    login: authController.login
  }
};
