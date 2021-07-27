import { Document, model, Schema } from "mongoose";

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

interface  CBCropData extends Document {
    name: string
    category: string
    fertilizer: string
    fertilizerQuantity: number
    water: number
    cost: number
    timeStamp: string
    weather: WeatherData
    crop: string
}

const CropDataSchema = new Schema<CBCropData>({
    name: String,
    category: String,
    fertilizer: String,
    fertilizerQuantity: Number,
    water: Number,
    cost: Number,
    timeStamp: String,
    weather: Object,
    crop: String
});

const CropData = model("CropData", CropDataSchema);

export { CropData };