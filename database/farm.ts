import { Document, model, Schema } from "mongoose";

// naturals
enum CropCategory { Legume, Fruit, Vegetable }


interface CBFarm extends Document {
    title: string
    owner: string
    location: string
    plant: string
    fertilizer: string
    inputSeeds: string
    category: CropCategory
}

const FarmSchema = new Schema<CBFarm>({
    title: String,
    owner: String,
    location: String,
    plant: String,
    fertilizer: String,
    inputSeeds: String,
    category: String
});

const Farm = model("Farm", FarmSchema);

export { Farm };