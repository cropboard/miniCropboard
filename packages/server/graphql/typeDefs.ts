import { gql } from "apollo-server-express";

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
scalar Weather

type User {
    name: String!
    email: String!
    location: String!
    _id: ID!
    farms: [Farm]
}

type Farm {
    title: String!
    owner: String!
    location: String!
    fertilizer: String!
    inputSeeds: String!
    plant: String!
    category: String!
    crops: [Crop]
    id: ID!
}

type Crop {
    name: String!
    category: String!
    fertilizerQuantity: Int!
    water: Int!
    cost: Int!
    timeStamp: String!
    weather: Weather!
    farm: String!
}

type Query {
    user: User
    hello: String
}

type Mutation {
    createFarm(title: String!, location: String!, fertilizer: String!, inputSeeds: String!, plant: String!, category: String!): Farm
    updateFarm(title: String, location: String, fertilizer: String, inputSeeds: String, plant: String, category: String): Farm
    createCrop(name: String!, category: String!, fertilizerQuantity: Int!, water: Int!, cost: Int!, weather: Weather!, farm: String!): Crop
}

`;

export { typeDefs }; 