
import { User, Farm } from "../database/index";

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
        },

        createFarm: (parent: any, args: any) => {
            let isError: boolean = false;
            const newFarm = Farm.create({
                title: args.title,
                owner: args.owner,
                location: args.location,
                fertilizer: args.fertilizer,
                inputSeeds: args.inputSeeds,
                plant: args.plant,
                category: args.category
            }, (error: any, newfarm: any) => {
                if (error) {
                    isError = true;
                    return Error(error);
                }

                return newfarm;
            });

            if (!isError) {
                return {
                    title: args.title,
                    owner: args.owner,
                    location: args.location,
                    fertilizer: args.fertilizer,
                    inputSeeds: args.inputSeeds,
                    plant: args.plant,
                    category: args.category
                }
            } else {
                return {
                    title: "NO",
                    owner: "NO",
                    location: "NO",
                    fertilizer: "NO",
                    inputSeeds: "NO",
                    plant: "NO",
                    category: "NO"
                }
            }
        },
        updateFarm: (parent: any, args: any) => {
            let farmId: string = args.id;
            let oldFarm: any = {};
            let hasFailed: boolean = false;

            Farm.findById(farmId, (error: any, farm_: any) => {
                if (error) throw new Error(error);

                oldFarm = farm_;
            });

            console.log(oldFarm);

            Farm.findByIdAndUpdate(farmId, {
                title: args.title ? args.title : oldFarm.title ,
                location: args.location ? args.location : args.location,
                fertilizer: args.fertilizer ? args.fertilizer : oldFarm.fertilizer,
                inputSeeds: args.inputSeeds ? args.inputSeeds : oldFarm.inputSeeds,
                plant: args.plant ? args.plant : oldFarm.plant,
                category: args.category ? args.category : oldFarm.category
            }, (error: any, updatedFarm: any) => {
                if (error) {
                    hasFailed = true;
                    return Error(error);
                }

                return updatedFarm;
            });

            if (!hasFailed) {
                return {
                    title: args.title,
                    location: args.location,
                    fertilizer: args.fertilizer,
                    inputSeeds: args.inputSeeds,
                    plant: args.plant,
                    category: args.category
                }
            }
        }
    }
}

export { resolvers };