import { Schema, Document, model } from "mongoose";

// naturals
enum CropCategory { Legume, Fruit, Vegetable }

interface CBCrop extends Document {
    name: string
    category: CropCategory
    weather: object
    fertilizer: string
    water: string
    cost: string
}

const CropSchema = new Schema<CBCrop>({
    name: String,
    category: String,
    weather: Object,
    fertilizer: String,
    water: String,
    cost: String
});

const Crop = model("Crop", CropSchema);

export { Crop };