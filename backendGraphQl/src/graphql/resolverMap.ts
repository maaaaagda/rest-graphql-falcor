import { UserResolvers } from "../api/user/graphql/resolver";
import { IResolvers } from "graphql-tools";
const resolverMap: IResolvers = {
  Query: {
    ...UserResolvers.Query
  },
  Mutation: {
    ...UserResolvers.Mutation
  }
};
export default resolverMap;
