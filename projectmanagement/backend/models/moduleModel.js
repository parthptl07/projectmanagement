import mongoose from 'mongoose'

const moduleSchema = new mongoose.Schema({
    module:String,
    status:String
},{timestamps:true})

const ModuleModel = mongoose.model("module",moduleSchema)

export default ModuleModel;