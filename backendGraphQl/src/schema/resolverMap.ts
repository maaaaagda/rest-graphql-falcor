import { IResolvers } from 'graphql-tools';
import { UserResolver } from "../api/user/schema/resolver"
const resolverMap: IResolvers = {
  Query: {
    users: new UserResolver().users
  },
};
export default resolverMap;