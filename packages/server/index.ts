
// import { ApolloServer, gql } from "apollo-server";
import { ApolloServer } from "apollo-server-express";
import { requestLogger } from "./utils/logger";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";

// import express
import express, { Application, Request, Response } from "express";
import jwt from "jsonwebtoken";

// import user model for authentication operations
import { User } from "./database";

// password handling functions
import { hashPassword, isPassword } from "./utils/passmanager";

// import jwt managers
import { createToken, validateToken } from "./utils/tokenmanager";

//instance app
const app: Application = express();

/* Very specific operations -> Authentication handled in REST API */
app.post("/signup", (req: Request, res: Response) => {
    // get information from user request
    console.log(req.body);
    const { name, email, location, password } = req.body;

    // user registration date
    const registrationDate: string = new Date().toString();

    // new user information
    const newUserData = {
        name: name,
        email: email,
        password: hashPassword(password),
        registrationDate: registrationDate,
        location: location
    };

    // create new user in database 

    let newUser = new User(newUserData);

    newUser.save((error: Error, user: any) => {
        if (error) {
            res.send({"Message": "Could not create user"});
            return;
        }

        // generate a token for the user
        let newUserToken: string = createToken({email: user.email, id: user._id});
        console.table(user);
        res.send({
            "Message": "Created Successfully",
            "Token": newUserToken
        });

    });

    // Created a user

});

// login route
app.post("/login", (req: Request, res: Response) => {
    // get information submitted
    const { email, password } = req.body;

});

/* End of authentication routes */
/* 
Instance the server with type definitions
and resolvers
*/
const server = new ApolloServer({
    typeDefs, 
    resolvers, 
    logger: requestLogger,
});

// server.listen().then(({url}) => console.log(url));

server.start().then(() => server.applyMiddleware({app}));

app.listen({port: 4000}, () => console.log("Working... 4000"));

module.exports = app;