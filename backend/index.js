import express from "express";
import connectToMongo from "./db.js"
import productRouter from "./routes/product.js"
import userRouter from "./routes/user.js"
import cors from "cors"
import cookieParser from "cookie-parser";
import { config } from "dotenv";

const app = express()
config()

app.use(express.json());
app.use(cookieParser());
app.use("*", cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
    next();
});

connectToMongo()

//Middleware 

app.use("/", userRouter)
app.use("/product", productRouter)


app.listen(process.env.PORT, () => {
    console.log(`server is Running at ${process.env.PORT}`)
})
