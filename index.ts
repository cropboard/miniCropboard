
import { ApolloServer, gql } from "apollo-server";
import { requestLogger } from "./utils/logger";
import { Farm, User } from "./types";

// dataset
let users: Array<User> = [
    {
        name: "Dane",
        id: 1
    },
    {
        name: "Mike",
        id: 2
    },
    {
        name: "Kyle",
        id: 3
    }
]

let farms: Array<Farm> = [
    {
        title: "Sample1",
        user: 2
    },
    {
        title: "MyFarm",
        user: 1
    },
    {
        title: "Farm001",
        user: 3
    }
]


const typeDefs = gql`
    type User {
        name: String!
        id: ID!
        farm: Farm
    }

    type Farm {
        title: String!
        user: User
    }

    type Query {
        users: [User]
        User: User
        farms: [Farm]
    }
`

const resolvers = {
    Query: {
        users: () => users,
        farms: () => farms
    }
}


const server = new ApolloServer({
    typeDefs, 
    resolvers, 
    playground: {
        cdnUrl: "http://localhost:8000"
    }, 
    logger: requestLogger
});

server.listen().then(({url}) => console.log(url));