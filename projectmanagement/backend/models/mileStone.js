import mongoose from "mongoose";

const mileSchema = new mongoose.Schema({
    title:String,
    description:String,
    startDate:String,
    endDate:String,
    status:String
},{timestamps:true})

const MileModel = mongoose.model("milestone", mileSchema)

export default MileModel;