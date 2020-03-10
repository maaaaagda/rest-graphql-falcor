import { UserController } from "../controller/UserController";

const userController = new UserController();

export const userRoutes = [
  {
    route: "users[{keys:ids}][\"name\", \"email\", \"role\"]",
    get: async (pathSet) => {
      const users = await userController.getUsers();
      const usersRoute = {};
      pathSet.ids.forEach((id) => {
        const user = users.find((user) => user._id == id);
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
      const users = (await userController.getUsers()).slice(0, pathSet.indexRanges[0].to + 1);
      const usersRoute = {};
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
      const user = (await userController.getUsers())[0];
      return pathSet[1].map(function(key) {
                  return { path: ["user", key], value: user[key]};
              });
            }
  }
];
