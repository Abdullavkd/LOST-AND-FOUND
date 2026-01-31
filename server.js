import express from 'express';
import mongoose from 'mongoose';
import authRouter from './Router/auth.js';
import productRouter from './Router/product.js';

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
app.use(express.json())

app.use("/", authRouter)
app.use('/api/items', productRouter)

async function start() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected")
        app.listen(PORT, () => console.log(`Server is Running on port : ${PORT}`))
    } catch (error) {
        console.log(error);
    }    
}
start();