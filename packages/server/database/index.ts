import mongoose from "mongoose";
import { mongoDBAccessConfig, mongoDBURI } from "../serviceConfig";

// import models
import { Farm } from "./farm";
import { User } from "./user";
import { Crop } from "./crop";
import { CropData } from "./cropData";

// connect to mongo database
mongoose.connect(mongoDBURI, mongoDBAccessConfig);

const mongoInstance = mongoose;

export default mongoInstance;

export { Farm, User, Crop, CropData };
