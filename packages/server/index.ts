
// import { ApolloServer, gql } from "apollo-server";
import { ApolloServer } from "apollo-server-express";
import { requestLogger } from "./utils/logger";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";

// import express
import express, { Application } from "express";

//instance app
const app: Application = express();

/* 
Instance the server with type definitions
and resolvers
*/

const server = new ApolloServer({
    typeDefs, 
    resolvers, 
    logger: requestLogger
});

// server.listen().then(({url}) => console.log(url));

server.start().then(() => server.applyMiddleware({app}));

app.listen({port: 4000}, () => console.log("Working... 4000"));