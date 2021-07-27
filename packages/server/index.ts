
// import { ApolloServer, gql } from "apollo-server";
import { ApolloServer } from "apollo-server-express";
import { requestLogger } from "./utils/logger";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";

// import express
import express, { Application, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

// import request logger
const morgan = require("morgan");

// import user model for authentication operations
import { User } from "./database";

// password handling functions
import { hashPassword, isPassword } from "./utils/passmanager";

// import jwt managers
import { createToken, validateToken } from "./utils/tokenmanager";

//instance app
const app: Application = express();

// make use of express json
app.use(express.json());

// make use of request logger for express
app.use(morgan("tiny"));

// use my cors middleware
import { corsMiddleware } from "./utils/corsMiddleware";

app.use(corsMiddleware);

/* Very specific operations -> Authentication handled in REST API */
app.post("/signup", (req: Request, res: Response) => {
    // get information from user request
    // console.log(req.body);
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
            res.send({"Message": "NotCreated"});
            return;
        }

        // generate a token for the user
        let newUserToken: string = createToken({email: user.email, id: user._id});
        // console.table({name: user.name, email: user.email, id: user._id.toString(), password: user.password, location: user.location, registrationDate: user.registrationDate});
        res.json({
            Message: "Created",
            Token: newUserToken,
            name: name,
            email: email
        });

    });

    // Created a user

});

// login route
app.post("/login", (req: Request, res: Response) => {
    // get information submitted
    const { email, password } = req.body;

    User.findOne({email: email}, (error: any, user: any) => {
        // handle error
        // console.log(error);
        if (error) {
            // return an error if no account matches the entered email
            res.json({
                message: "Could not find an account with that email"
            });
            return
        }

        // the above error handler seems not to handle errors the way i expect
        // Maybe wrapping what is below in a try-catch block might help
        // the assumption is that the catch means the email entered was incorrect here

        try {
            	// if there are no errors, do this ->
            if (isPassword(password, user.password)) {
            // if the password entered by the user is a valid one
            // create a new token to issue
            let newToken: string = createToken({email: user.email, id: user._id});

            res.json({
                message: "Login Successful",
                token: newToken,
                name: user.name
            });

        } else {
            // incorrect password if no match
            res.json({
                message: "Incorrect Password"
            });
        }
        } catch (err0r) {
            res.json({
                message: "Incorrect email"
            })
        }

    });

    // logged in bro  
});

// this route is to check if the user is authenticated on the client side when he/she opens the 
// dashboard. This is to prevent a flash of unauthenticated content or view of the dashbord

app.post("/isauthenticated", (req: Request, res: Response) => {
    const { token } = req.body;

    // we verify if the token is valid.
    // we just need to know if it is still valid issuer and non-expired
    // then we check if the email exist in the database
    let tokenData: JwtPayload;
    try {
        tokenData = validateToken(token);

        User.findOne({email: tokenData.email}, (error: any, user: any) => {
        if (error) {
            res.json({
                message: "The user does no exist"
            });
        } 
        res.json({
                message: "Authenticated"
        });
    });
    } catch(err) {
        res.json({
            message: "NotAuthenticated"
        });
    }
    // console.log(typeof tokenData.email);
    // res.send("Some error occurred on the server");
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
    context: ({req}) => {

        // get the request headers
        const requestHeaders: any = req.headers;

        // get the authentication JWT
        const authToken: string = (requestHeaders.authorization).split(" ")[1];

        // validate the token to get user data
        try {
            const userData: any = validateToken(authToken);
            return userData;
        } catch (error: any) {
            return {"message": "AuthError"};
        }
    }
});

// server.listen().then(({url}) => console.log(url));

server.start().then(() => server.applyMiddleware({app}));

app.listen({port: 4000}, () => console.log("Working... 4000"));

module.exports = app;