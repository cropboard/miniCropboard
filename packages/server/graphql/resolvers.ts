
import { User, Farm, Crop } from "../database/index";

// import custom scalar
import { weatherScalar } from "../scalars/weatheraScalar";
/* 
Here we handle all of the database queries
necessary to maintain the GraphQL service
*/

const resolvers = {
    Weather: weatherScalar,
    Query: {
        user: async (parent: any, args: any) => {
            let userData = undefined;
            let unval; // use to await assignment of the fetched data -> will get assigned no value [undefined]
            const user = await User.findById(args.id, (error: any, foundUser: any) => {
                if (error) return Error(error);
                // console.log(foundUser);
                userData = foundUser;
                return foundUser;
            });
            unval = await user;
            return userData;
        }
    },
    Mutation: {
        createUser: (parent: any, args: any) => {
            let isError: boolean = false;
            let registerDate: string = new Date().toString();
            const newUser = User.create({
                name: args.name,
                email: args.email,
                password: args.password,
                registrationDate: registerDate,
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

            // fetch old farm data
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
        },
        createCrop: (parent: any, args: any) => {
            let isError: boolean = false;
            let newCrop = Crop.create({
                name: args.name,
                category: args.category,
                fertilizerQuantity: args.fertilizerQuantity,
                water: args.water, 
                cost: args.cost,
                timeStamp: args.timeStamp,
                weather: args.weather,
                farm: args.farm
            }, (error: any, newcrop: any) => {
                if (error) {
                    isError = true;
                    console.warn(error);
                }
                return newcrop;
            });

            if (!isError) {
                return {
                    name: args.name,
                    category: args.category,
                    fertilizerQuantity: args.fertilizerQuantity,
                    water: args.water, 
                    cost: args.cost,
                    timeStamp: args.timeStamp,
                    weather: args.weather,
                    farm: args.farm
                }
            }
        }
    },

    // for fetching farms withing a user scope
    User: {
        farms: async (parent: any, args: any) => {
            // fetch all farms where the id equal the id of the parent
            let isError: boolean = false; // chcecker for errors
            let farms;
            let unval; // waiter
            let farmFetch = await Farm.find({owner: parent._id}, (error: any, farms_: any) => {
                // handling fail safe
                if (error) {
                    isError = true;
                    return Error(error);
                }

                farms = farms_; // assign the farms to the fetched data
            });
            unval = await farmFetch;

            if (!isError) {
                return farms;
            }

            return "An error occured";

        }
    },

    // fetching crop within a farm scope
    Farm: {
        crops: async (parent: any, args: any) => {
        // error checker
        let isError = false;
        let crops;
        let unval;
        // console.log(parent)
        let cropsFetch = await Crop.find({ farm: parent._id }, (error: any, crops_: any) => {
            if (error) {
                isError = true;
                return Error(error);
            }

            // assign the fetched crops to the array of crops
            crops = crops_;
        });

        // wait for the assignment of crops to the array of crops
        unval = await cropsFetch;

        // check is there was an error
        if (!isError) {
            return crops
        }

        return "Could not find anything";

    }
    }
}

export { resolvers };