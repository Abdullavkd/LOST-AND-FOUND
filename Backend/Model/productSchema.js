import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Lost', 'Found'],
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Resolved'],
        default: "Active"
    },
    date: {
        type: Date,
        default: Date.now()
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const productModel = mongoose.model("product", productSchema);
export default productModel;