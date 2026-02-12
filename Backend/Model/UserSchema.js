import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is Required"],
    },
    email: {
        type: String,
        required: [true, "Email id is Required"],
        unique:true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ["admin", "user"]
    },
    status: {
        type: String,
        required: true,
        default: 'unblocked',
        enum: ['blocked', 'unblocked']
    }
})

const userModel = mongoose.model("user", userSchema);

export default userModel;