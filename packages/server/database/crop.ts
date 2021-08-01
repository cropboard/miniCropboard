import { Schema, Document, model } from "mongoose";

// naturals
enum CropCategory { Legume, Fruit, Cereal }


interface CBCrop extends Document {
    name: string
    category: CropCategory
    fertilizer: string
    timeStamp: string,
    farm: string
    harvested: boolean
    output: number
    inputSeeds: number
}

const CropSchema = new Schema<CBCrop>({
    name: String,
    category: String,
    fertilizer: String,
    timeStamp: String,
    farm: String,
    harvested: Boolean,
    output: Number,
    inputSeeds: Number
});

const Crop = model("Crop", CropSchema);

export { Crop };