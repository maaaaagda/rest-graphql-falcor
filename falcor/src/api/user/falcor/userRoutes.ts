import { IUser } from "./../model/User";
import { UserController } from "../controller/UserController";

const userController = new UserController();

export const userRoutes: any = [
  {
    route: "users[{keys:ids}][\"name\", \"email\", \"role\"]",
    get: async (pathSet) => {
      const users: IUser[] = await userController.getUsers();
      const usersRoute: object = {};
      pathSet.ids.forEach((id) => {
        const user: IUser = users.find((user) => user._id == id);
        usersRoute[id] = {};
        pathSet[2].forEach((key) => {
          usersRoute[id][key] = user[key];
        });
      });
      return { jsonGraph: {users: usersRoute} };    
    }
  },
  {
    route: "users[{ranges:indexRanges}][\"name\", \"email\", \"role\"]",
    get: async (pathSet) => {
      const users: IUser[] = (await userController.getUsers()).slice(0, pathSet.indexRanges[0].to + 1);
      const usersRoute: object = {};
      users.forEach((user, i) => {
        usersRoute[i] = {};
        pathSet[2].forEach((key) => {
          usersRoute[i][key] = user[key];
        });
      });
      return { jsonGraph: {users: usersRoute} };
    }
  },
  {
    route: "user[\"name\", \"email\", \"role\"]",
    get: async (pathSet) => {
      const user: IUser = (await userController.getUsers())[0];
      return pathSet[1].map((key) => {
            return { path: ["user", key], value: user[key]};
        });
      }
  },
  {
    route: "user.add",
    call: async (callPath, args, pathSet, paths) => {
      const user: IUser = await userController.addUser(args[0]);
      return pathSet.map((key) => {
            return { path: ["user", key], value: user[key]};
        });
      }
  }
];
