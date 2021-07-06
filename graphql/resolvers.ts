
import { User } from "../database/index";

/* 
Here we handle all of the database queries
necessary to maintain the GraphQL service
*/

const resolvers = {
    Query: {
        user: (parent: any, args: any) => {
            const user = User.findById(args.id, (error: any, foundUser: any) => {
                if (error) return Error(error);
                console.log(foundUser);
                return foundUser;
            });
        }
    },
    Mutation: {
        createUser: (parent: any, args: any) => {
            let isError: boolean = false;
            const newUser = User.create({
                name: args.name,
                email: args.email,
                password: args.password,
                registrationDate: args.registraionDate,
                location: args.location
            }, (error: any, newuser) => {
                // handle your fail safes bro ;)

                if (error) {
                    isError = true;
                    return Error(error);
                };
                // console.log(newuser);
                return newuser;
            });
           if (!isError) {
               return { // return the info of the newly created user
                name: args.name,
                email: args.email,
                location: args.location
               }
           } else {
               return { // return the info of the newly created user
                name: "NO",
                email: "NO",
                location: "NO"
               }
           }
        }
    }
}

export { resolvers };