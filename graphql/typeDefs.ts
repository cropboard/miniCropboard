import { gql } from "apollo-server";

/* 
All of the models in the database will default to a 
*/

/* 
Water in crops will be an integer -> in liters
so we have to handle the conversion on the client side of via a function

fertilizerQuantity in a physical volume quantity
cost in an Int in the currency of the farm location
*/
const typeDefs = gql`
type User {
    name: String!
    email: String!
    location: String!
    _id: ID!
}

type Farm {
    title: String!
    owner: String!
    location: String!
    fertilizer: String!
    inputSeeds: String!
    plant: String!
    category: String!
}

type Weather {
    speed: String!
    pressure: String!
    humidity: Int!
    uv: Int!
    temperature: number
}

type Crop {
    name: String!
    category: String!
    fertilizerQuantity: Int!
    water: Int!
    cost: String!
    timeStamp: String!
    weather: Weather
}

type Query {
    user(id: ID!): User
}

type Mutation {
    createUser(name: String!, email: String!, password: String!, registrationDate: String!, location: String!): User
    createFarm(title: String!, owner: String!, location: String!, fertilizer: String!, inputSeeds: String!, plant: String!, category: String!): Farm
    updateFarm(title: String, location: String, fertilizer: String, inputSeeds: String, plant: String, category: String): Farm

    createCrop(name: String!, category: String!, fertilizerQuantity: String!, water: Int!, cost: Int!, timeStamp: String!, weather: Weather!)
}

`;

export { typeDefs }; 