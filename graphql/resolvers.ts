
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
                return foundUser;
            });
        }
    }
}

export { resolvers };