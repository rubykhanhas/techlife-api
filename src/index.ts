import {ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core";
import {ApolloServer} from "apollo-server-express";
import "dotenv/config";
/*  */
import Express from "express";
import "reflect-metadata";
import {buildSchema} from "type-graphql";
import {connectDB} from "./utils/connectDB";
import {ProductResolver} from "./resolvers/productResolver";
/*  */
const app = Express();

connectDB();

(async function startApolloServer() {
  const server = new ApolloServer({
    schema: await buildSchema({resolvers: [ProductResolver]}),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    introspection: true,
  });
  await server.start();
  await server.applyMiddleware({app});
  await app.listen(process.env.PORT!, () =>
    console.log(`server ready at http://localhost:${process.env.PORT!}${server.graphqlPath}`)
  );
})();

app.get("/", (_, res) => res.send("<h1>hello world!</h1>"));
