import express from 'express';
import mongoose from 'mongoose';
import authRouter from './Router/auth.js';
import productRouter from './Router/product.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// app.use(cors())
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true               
}));

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