import express from "express";
import connectToMongo from "./db.js"
import productRouter from "./routes/product.js"
import userRouter from "./routes/user.js"
import cors from "cors"
import cookieParser from "cookie-parser";
import { config } from "dotenv";

const app = express()
config()

const corsOptions = {
    origin: true,
    credentials: true
};

app.use(cors(corsOptions))
app.use(cookieParser());
connectToMongo()

//Middleware 
app.use(express.json());

app.use("/", userRouter)
app.use("/product", productRouter)

app.listen(process.env.PORT, () => {
    console.log(`server is Running at ${process.env.PORT}`)
})
