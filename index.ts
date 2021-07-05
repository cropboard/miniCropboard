
const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
    type User {
        name: String
        id: Int
    }

    type Farm {
        title: String
        user: User
    }

    type Query {
        farms: [Farm],
        users: [User]
    }
`

// dataset
let users = [
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

let farms = [
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

const resolvers = {
    Query: {
        farms: () => farms,
        users: () => users
    }
}

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => console.log(url));