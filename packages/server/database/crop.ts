import { Schema, Document, model } from "mongoose";

// naturals
enum CropCategory { Legume, Fruit, Cereal }


interface CBCrop extends Document {
    name: string
    category: CropCategory
    fertilizer: string
    water: string
    cost: string
    timeStamp: string,
    farm: String
}

const CropSchema = new Schema<CBCrop>({
    name: String,
    category: String,
    fertilizer: String,
    water: String,
    cost: String,
    timeStamp: String,
    farm: String
});

const Crop = model("Crop", CropSchema);

export { Crop };