
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
            }
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
        updateFarm: async (parent: any, args: any) => {
            let farmId: string = args.id;
            let oldFarm: any;
            let updatedFarm__: any;
            let unval; // dirty workaround
            let unval_; // dirty workaround... again!
            let hasFailed: boolean = false;
            let hasFailed__: boolean = false;

            console.log(farmId)

            // fetch old farm data
            unval = await Farm.findById(farmId, (error: any, farm_: any) => {
                if (error) {
                    hasFailed = true;
                }
                oldFarm = farm_;
                // console.log(`Old Farm -> ${oldFarm}`)
            });

            // console.log(oldFarm);

            if (!hasFailed) {
                // if oldFarm was fetched successfully
                unval_ = await Farm.findByIdAndUpdate(farmId, {
                title: args.title ? args.title : oldFarm.title ,
                location: args.location ? args.location : oldFarm.location,
                category: args.category ? args.category : oldFarm.category,
                kind: args.kind ? args.kind : oldFarm.kind
                        }, (error: any, updatedFarm: any) => {
                            console.log(`Updated farm -> ${updatedFarm}`);
                        if (error) {
                            hasFailed__ = true;
                            return Error(error);
                        }

                        updatedFarm__ = updatedFarm;
                        return updatedFarm;
                    });

                    if (!hasFailed__) {
                    return updatedFarm__;
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
                timeStamp: timeStamp,
                farm: args.farm,
                harvested: false,
                output: 0,
                inputSeeds: args.inputSeeds
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
                    fertilizer: args.fertilizer,
                    timeStamp: timeStamp,
                    farm: args.farm,
                    inputSeeds: args.inputSeeds
                }
            }
        },
        createCropData: async (parent: any, args: any) => {
            let isError: boolean = false;
            let isError_: boolean = false;
            let timeStamp: string = new Date().toString();

            let parentCrop: any;
            let parentFarm: any;
            let unval: any; // this dirty workaround...
            const parentCropId: string = args.crop;
            console.log(parentCropId)

            unval = await Crop.findById(parentCropId, (error: any, parentcrop: any) => {
                if (error) {
                    isError = true;
                }
                let weatherData_: any;
                console.log(`Parent Crop -> ${JSON.stringify(parentcrop)}`);
                parentCrop = parentcrop;
                console.log(parentcrop);

            });

            if (!isError) {
                    let newCropData = CropData.create({
                        name: parentCrop.name,
                        category: parentCrop.category,
                        fertilizer: args.fertilizer ? args.fertilizer : parentCrop.fertilizer,
                        fertilizerQuantity: args.fertilizerQuantity,
                        water: args.water,
                        cost: args.cost,
                        timeStamp: timeStamp,
                        weather: args.weather,
                        crop: args.crop
                    }, (error: any, newcropdata: any) => {
                        if (error) {
                            isError_ = true;
                            console.error(error);
                        }

                        console.log(newcropdata)
                        return newcropdata
                    });


                if (!isError_) {

                    return {
                        name: parentCrop.name,
                        category: parentCrop.category,
                        fertilizer: args.fertilizer ? args.fertilizer : parentCrop.fertilizer,
                        fertilizerQuantity: args.fertilizerQuantity,
                        water: args.water,
                        cost: args.cost,
                        timeStamp: timeStamp,
                        weather: "SomeWeatherData"
                    }

                }
            }

            
        },
        harvestCrop: (parent: any, args: any) => {
            // get the cropId from the args
            const cropId: string = args.id;
            // get output
            const cropOutput: number = args.output;

            let isError: boolean = false;

            Crop.findByIdAndUpdate(cropId, { harvested: true, output: cropOutput }, (error: any, res: any) => {
                if (error) {
                    isError = true;
                    return "Error";
                }

            });

            return !isError ? "Harvested" : "Error";
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
    },
    Crop: {
        cropsData: async (parent: any, args: any) => {
            let isError: boolean = false; // error checker
            let cropsData_;
            let unval; // dirty workaround

            let cropsDataFetch = await CropData.find({crop: parent._id}, (error: any, cropsdata: any) => {
                if (error) {
                    isError = true;
                    return Error(error);
                }

                // put the fetched cropsData in cropsData
                // console.log(`Parent ID -> ${parent._id}`);
                // console.log(`cropsdata -> ${cropsdata}`)
                cropsData_ = cropsdata;
                // console.log(cropsData_);
            });

            unval = await cropsDataFetch;

            if (!isError) {
                return cropsData_;
            }

            return "Could not find anything";
        }
    }
}

export { resolvers };