import { Query } from "./../../../frontend/src/rest/query";
import { UserResolvers } from "../api/user/graphql/resolver";
import { AuthResolvers } from "../api/auth/graphql/resolver";
import { IResolvers } from "graphql-tools";
import { DietResolvers } from "../api/diet/graphql/resolver";

const resolverMap: IResolvers = {
  Query: {
    ...UserResolvers.Query,
    ...AuthResolvers.Query,
    ...DietResolvers.Query
  },
  Mutation: {
    ...UserResolvers.Mutation,
    ...AuthResolvers.Mutation,
    ...DietResolvers.Mutation
  }
};
export default resolverMap;
