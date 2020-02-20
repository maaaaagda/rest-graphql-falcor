import { IResolvers } from 'graphql-tools';
import {GetUserController} from "../api/user/schema/resolver"
const resolverMap: IResolvers = {
  Query: {
    users: new GetUserController().users
  },
};
export default resolverMap;