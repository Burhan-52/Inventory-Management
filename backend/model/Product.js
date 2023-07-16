import mongoose from "mongoose";

const product = mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    name: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }

})

export default mongoose.model("product", product);

