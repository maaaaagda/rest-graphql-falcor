import { UserController } from "../controller/UserController";
const userController = new UserController();

export const UserResolvers = {
  Query: {
    users: userController.getUsers
  },
  Mutation: {
    addUser: userController.addUserr
  }
};
