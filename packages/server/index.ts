
import { ApolloServer, gql } from "apollo-server";
import { requestLogger } from "./utils/logger";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";


/* 
Instance the server with type definitions
and resolvers
*/

const server = new ApolloServer({
    typeDefs, 
    resolvers, 
    playground: {
        cdnUrl: "http://localhost:8000"
    }, 
    logger: requestLogger
});

server.listen().then(({url}) => console.log(url));