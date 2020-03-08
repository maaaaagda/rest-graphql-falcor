import { UserController } from '../controller/UserController';

const userController = new UserController()

export const userRoutes = [
  {
    route: "user[\"name\", \"email\", \"role\"]",
    async get(pathSet) {
      const user = (await userController.getUsers())[0]
      return pathSet[1].map(function(key) {
                  return { path: ["user", key], value: user[key]};
              });
            }
  }
]