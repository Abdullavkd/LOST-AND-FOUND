import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    image: {
        type: String,
    },
    location: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['lost', 'found'],
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'resolved'],
        default: "active"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const productModel = mongoose.model("product", productSchema);
export default productModel;