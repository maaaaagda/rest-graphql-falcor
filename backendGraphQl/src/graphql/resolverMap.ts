import { UserResolvers } from "../api/user/graphql/resolver";
import { IResolvers } from "graphql-tools";
const resolverMap: IResolvers = {
  Query: {
    ...UserResolvers
  },
};
export default resolverMap;
