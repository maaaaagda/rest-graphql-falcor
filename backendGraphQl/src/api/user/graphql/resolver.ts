import { UserController } from "../controller/UserController";
const userController = new UserController();

export const UserResolvers = {
  users: userController.getUsers
};
