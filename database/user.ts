
import { Schema, Document, model } from "mongoose";

interface CBUser extends Document {
    name: string
    email: string
    password: string
    registrationDate: string
    location: string
}

const CBUserSchema = new Schema<CBUser>({
    name: String,
    email: String,
    password: String,
    registrationDate: String,
    location: String
});

const User = model("User", CBUserSchema);

export { User };