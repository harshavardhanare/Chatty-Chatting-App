
import express from "express"
import authroutes from './routes/auth.route.js'
import messageRoutes from "./routes/message.route.js"
import dotenv from "dotenv"
dotenv.config();
import { connectDb } from "./lib/db.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import {app,server} from "./lib/socket.js"
// const app=express()


const PORT= process.env.PORT || 5000
console.log(process.env.FrontEnd)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser())
app.use(
    cors({
    origin: process.env.FrontEnd,
    credentials:true,
     methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow these HTTP methods
    allowedHeaders: "Content-Type, Authorization",
})
);
app.use("/api/auth",authroutes)
app.use("/api/messages",messageRoutes)




    
server.listen(PORT,()=>{
    // console.log("Mongo URL:", process.env.MONGO_URL);
    console.log("server is running at port:-"+PORT);
    connectDb()
     
})