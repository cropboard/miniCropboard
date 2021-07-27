
import { User, Farm, Crop, CropData } from "../database/index";
import * as dotenv from "dotenv";

// import custom scalar
import { weatherScalar } from "../scalars/weatherScalar";
/* 
Here we handle all of the database queries
necessary to maintain the GraphQL service
*/

// configure environment variables
dotenv.config();

const SECRET_KEY: any = process.env.SECRET_KEY;

const resolvers = {
    Weather: weatherScalar,
    Query: {
        user: async (parent: any, args: any, context: any) => {
            if (context.message === "AuthError") {
                return {
                    name: "AuthError",
                    email: "AuthError",
                    location: "AuthError",
                    _id: "AuthError",
                    farms: ["AuthError"]
                }
            } else {
                let userData = undefined;
                let unval; // use to await assignment of the fetched data -> will get assigned no value [undefined]
                const user = await User.findById(context.id, (error: any, foundUser: any) => {
                    if (error) return Error(error);
                    // console.log(foundUser);
                    userData = foundUser;
                    return foundUser;
                });
                unval = await user;
                return userData;
            }
            
        },
        hello: (parent: any, args: any, context: any) => {
            console.log("From GraphQL context");
            console.log(context);
            console.log("End GraphQL context");
            return "World";
        }
    },
    Mutation: {
        createFarm: async (parent: any, args: any, context: any) => {

            // contain farm data
            let farmData: any;

            // timeStamp
            const timeStamp: string = new Date().toString();

            // handle error case
            if (context.message === "AuthError") {
                return {
                    title: "AuthError",
                    owner:"AuthError",
                    location: "AuthError",
                    category: "AuthError",
                    kind: "AuthError",
                    id: "AuthError",
                    timeStamp: timeStamp
                }
            }

            // error bool container
            let isError: boolean = false;

            // create new farm
            const newFarm_ = Farm.create({
                title: args.title,
                owner: context.id,
                location: args.location,
                category: args.category,
                kind: args.kind,
                timeStamp: timeStamp
            }, (error: any, newfarm: any) => {
                if (error) {
                    isError = true;
                    return Error(error);
                }

                farmData = newfarm;
                return newfarm;
            });

            if (isError) {
                return {
                    title: "NO",
                    owner: "NO",
                    location: "NO",
                    category: "NO",
                    kind: "NO",
                    timeStamp: "NO"
                }
            }

            // this executes if no error occurs
            let unval = await newFarm_;
            return {
                title: args.title,
                owner: context.id,
                location: args.location,
                category: args.category,
                kind: args.kind,
                timeStamp: timeStamp
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
                category: args.category ? args.category : oldFarm.category,
                kind: args.kind ? args.kind : oldFarm.kind
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
                    category: args.category,
                    kind: args.kind
                }
            }
        },
        createCrop: (parent: any, args: any) => {
            let isError: boolean = false;
            let timeStamp: string = new Date().toString();
            let newCrop = Crop.create({
                name: args.name,
                category: args.category,
                fertilizer: args.fertilizer,
                water: args.water, 
                cost: args.cost,
                timeStamp: timeStamp,
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
                    timeStamp: timeStamp,
                    weather: args.weather,
                    farm: args.farm
                }
            }
        },
        createCropData: (parent: any, args: any) => {
            let isError: boolean = false;
            let timeStamp: string = new Date().toString();

            let newCropData = CropData.create({
                name: parent.name,
                category: parent.category,
                fertilizer: args.fertilizer,
                fertilizerQuantity: args.fertilizerQuantity,
                water: args.water,
                cost: args.cost,
                timeStamp: timeStamp,
                weather: "SomeWeatherData"
            }, (error: any, newcropdata: any) => {
                if (error) {
                    isError = true;
                    console.error(error);
                }

                return newcropdata
            });

            if (!isError) {
                return {
                    name: parent.name,
                    category: parent.category,
                    fertilizer: args.fertilizer,
                    fertilizerQuantity: args.fertilizerQuantity,
                    water: args.water,
                    cost: args.cost,
                    timeStamp: timeStamp,
                    weather: "SomeWeatherData"
                }

            }
        }
    },

    // for fetching farms withing a user scope
    User: {
        farms: async (parent: any, args: any) => {
            // fetch all farms where the id equal the id of the parent
            console.log(parent);
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