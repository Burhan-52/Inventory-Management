import mongoose from "mongoose";

const user = mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    img: {
        type:String
    },

    date: {
        type: Date,
        default: Date.now
    }

})

export default mongoose.model("users", user);

