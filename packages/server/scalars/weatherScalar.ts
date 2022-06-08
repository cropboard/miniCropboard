import { GraphQLScalarType, Kind } from "graphql";

const weatherScalar = new GraphQLScalarType({
  name: "Weather",
  description: "Weather scalar to represent weather data",
  serialize(value) {
    return JSON.parse(value);
  },
  parseValue(value) {
    return JSON.parse(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return JSON.stringify(ast.value);
    }

    return null;
  },
});

export { weatherScalar };
