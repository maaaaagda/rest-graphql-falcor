import { IResolver } from "../../../core/graphql/IResolver";
import { UserController } from "../controller/UserController";
const userController = new UserController();

export const UserResolvers: IResolver = {
  Query: {
    users: userController.getUsers
  },
  Mutation: {
    addUser: userController.addUserr
  }
};
