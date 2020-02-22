
import "graphql-import-node";
import { importSchema } from "graphql-import";
import { makeExecutableSchema } from "graphql-tools";
import resolvers from "./resolverMap";
import { GraphQLSchema } from "graphql";
import { join } from "path";

async function createGraphQLSchema() {
  try {
    const typeDefs = await importSchema(join(__dirname, "schema.gql"));
    const schema: GraphQLSchema = makeExecutableSchema({
      typeDefs,
      resolvers,
    });
    return schema;

  } catch (err) {
    console.log("Cannot create GraphQL schema. Error:", err);
  }

}

export default createGraphQLSchema;
