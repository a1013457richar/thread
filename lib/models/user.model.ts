import { on } from "events";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
       
    },
    name:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
        unique: true,
    },
    bio:String,
    image:String,
    threads:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thread",
    }],
    onboarded:{
        type: Boolean,
        default: false,
    },
    communities:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community",
    }],})


export default mongoose.models.User || mongoose.model("User", userSchema);






