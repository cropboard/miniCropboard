
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

    type Farm {
        title: String!
        user: User
    }

    type User {
        name: String!
        id: ID!
        farms: [Farm]
    }

    type Query {
        users: [User]
        farms: [Farm]
        user(id: ID): User
    }
`

const resolvers = {
    Query: {
        users: () => users,
        farms: () => farms,
        user: (parent: any, args: any) => users.find(user => user.id === args.id)
    },
    Farm: {
        user: (parent: Farm, args: any) => {
            return users.find(user => user.id === parent.user)
        }
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