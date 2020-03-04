import { Query } from "./../../../frontend/src/rest/query";
import { UserResolvers } from "../api/user/graphql/resolver";
import { AuthResolvers } from "../api/auth/graphql/resolver";
import { IResolvers } from "graphql-tools";
import { DietResolvers } from "../api/diet/graphql/resolver";
import { ProductResolvers } from "../api/product/graphql/resolver";
import { MealResolvers } from "../api/meal/graphql/resolver";
import { DailyDietResolvers } from "../api/dailyDiet/graphql/resolver";

const resolverMap: IResolvers = {
  Query: {
    ...UserResolvers.Query,
    ...AuthResolvers.Query,
    ...DietResolvers.Query,
    ...ProductResolvers.Query,
    ...MealResolvers.Query,
    ...DailyDietResolvers.Query
  },
  Mutation: {
    ...UserResolvers.Mutation,
    ...AuthResolvers.Mutation,
    ...DietResolvers.Mutation,
    ...ProductResolvers.Mutation,
    ...MealResolvers.Mutation,
    ...DailyDietResolvers.Mutation
  }
};
export default resolverMap;
