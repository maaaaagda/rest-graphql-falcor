import { UserController } from "../controller/UserController";

const userController = new UserController();

export const userRoutes = [
  {
    route: "users[{keys:ids}][\"name\", \"email\", \"role\"]",
    get: async (pathSet) => {
      const allUsers = await userController.getUsers();
      const users = {};
      pathSet.ids.forEach((id) => {
        const user = allUsers.find((user) => user._id == id);
        users[id] = {};
        pathSet[2].forEach((key) => {
          users[id][key] = user[key];
        });
      });
      return { jsonGraph: {users} };    
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
