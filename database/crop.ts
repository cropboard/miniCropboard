import { Schema, Document, model } from "mongoose";

// naturals
enum CropCategory { Legume, Fruit, Vegetable }

// all of the weather data below are atmoshperic
/* 
Humidity defaults to %
temperature defaults to °C
visibility round field 8.0km
we will get dew point from 
*/
interface WeatherData {
    speed: string
    pressure: string
    humidity: number
    UV: number
    atmosphericTemperature: number
}

interface CBCrop extends Document {
    name: string
    category: CropCategory
    weather: WeatherData
    fertilizer: string
    water: string
    cost: string
    timeStamp: string
}

const CropSchema = new Schema<CBCrop>({
    name: String,
    category: String,
    weather: Object,
    fertilizer: String,
    water: String,
    cost: String,
    timeStamp: String
});

const Crop = model("Crop", CropSchema);

export { Crop };