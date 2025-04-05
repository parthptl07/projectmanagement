import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name:String,
    description:String,
    startDate:String,
    endDate:String,
    status:String,
    manager:String
},{timestamps:true})

const ProjectModel = mongoose.model("project", projectSchema)

export default ProjectModel;