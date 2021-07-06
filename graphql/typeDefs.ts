import { gql } from "apollo-server";

/* 
All of the models in the database will default to a 
*/
const typeDefs = gql`
type User {
    name: String!
    email: String!
    location: String!
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
    temperature: Int!
    unit: String!
}

type Crop {
    name: String!
    category: String!
    fertilizer: String!
    water: String!
    cost: String!
    timeStamp: String!
    weather: Weather
}

type Query {
    user: User
}

`;

export { typeDefs }; 