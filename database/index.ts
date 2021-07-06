
import mongoose from "mongoose";
import { mongoDBAccessConfig, mongoDBURI } from "../serviceConfig";

// import models
import { Farm } from "./farm";
import { User } from "./user";

// connect to mongo database
mongoose.connect(mongoDBURI, mongoDBAccessConfig);

const mongoInstance = mongoose;

export default mongoInstance;

export { Farm, User };