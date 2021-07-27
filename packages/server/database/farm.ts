import { Document, model, Schema } from "mongoose";


interface CBFarm extends Document {
    title: string
    owner: string
    location: string
    category: string
    kind: string
    timeStamp: string
}

const FarmSchema = new Schema<CBFarm>({
    title: String,
    owner: String,
    location: String,
    category: String,
    kind: String,
    timeStamp: String
});

const Farm = model("Farm", FarmSchema);

export { Farm };