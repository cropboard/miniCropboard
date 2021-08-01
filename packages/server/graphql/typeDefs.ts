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
    category: String!
    kind: String!
    crops: [Crop]
    timeStamp: String!
    id: ID!
}

type Crop {
    name: String!
    category: String!
    fertilizer: String!
    timeStamp: String!
    farm: String!
    cropsData: [CropData]
    harvested: Boolean!
    output: Int!
    inputSeeds: Int!
    id: ID!
}

type CropData {
    name: String!
    category: String!
    fertilizer: String!
    fertilizerQuantity: Int!
    water: Int!
    cost: Int!
    timeStamp: String!
    weather: Weather!
    crop: String!
}

type Query {
    user: User
    hello: String
}

type Mutation {
    createFarm(title: String!, location: String!, category: String!, kind: String!): Farm
    updateFarm(id: String! title: String, location: String, category: String, kind: String): Farm
    createCrop(name: String!, category: String!, fertilizer: String!, inputSeeds: Int!, farm: String!): Crop
    harvestCrop(id: String!, output: Int!): String
    createCropData(fertilizer: String, fertilizerQuantity: Int!, water: Int!, cost: Int!, weather: Weather!, crop: String!): CropData
}

`;

export { typeDefs }; 