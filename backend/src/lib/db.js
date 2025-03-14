import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
export const connectDb=async ()=>{
    
    try{
        const MONGO_URI = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/chatting_app";
        const conn=await mongoose.connect(MONGO_URI);

        console.log(`mongodb is connected tho the host:-${conn.connection.host}`)

    }
    catch(err)
    {
        console.log(err);
    }
}