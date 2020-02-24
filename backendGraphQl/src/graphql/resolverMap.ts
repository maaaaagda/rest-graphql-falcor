import { Query } from "./../../../frontend/src/rest/query";
import { UserResolvers } from "../api/user/graphql/resolver";
import { AuthResolvers } from "../api/auth/graphql/resolver";
import { IResolvers } from "graphql-tools";
const resolverMap: IResolvers = {
  Query: {
    ...UserResolvers.Query,
    ...AuthResolvers.Query
  },
  Mutation: {
    ...UserResolvers.Mutation,
    ...AuthResolvers.Mutation
  }
};
export default resolverMap;
