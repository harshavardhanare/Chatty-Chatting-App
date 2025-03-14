import cloudinary from "../lib/cloudinary.js";
import { getRecieverSocketId } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.models.js";
import { io } from "../lib/socket.js";
export const getUsersForSidebar=async(req,res)=>{
    try{
        const loggedInUserId=req.user._id
        const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password")
        return res.status(200).json(filteredUsers);

    }
catch(error)
{
    console.error("error in getUsersForSidebar: ",error.message);
    return res.status(500).json({error:"Internal server Error",success:false})
}
}
export const getMessages=async(req,res)=>{
    try{
      
        const {id}=req.params
      
        const myId=req.user._id
       
        const messages=await Message.find({
            $or:[
                {senderId:myId,recieverID:id},
                {senderId:id,recieverID:myId}
        ]})
        // console.log(messages)
       return res.status(200).json(messages);
    }
catch(error)
{
console.log("error in getMessages:",error.message);
return res.status(500).json({error:"Internal server error",success:false})
}
}
export const sendMesssage= async(req,res)=>{
    try{
        const {text,image}=req.body
      
        const {id}=req.params
        console.log("req.params",id)
        const senderId=req.user._id;
        let imageUrl;
        if(image)
        {
            const uploadResponse= await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
        }
        const newMessage=new Message({
            senderId,
            recieverID:id,
            text,
            image:imageUrl,

        })

       const result= await newMessage.save();
       if(!result)
       {
        res.status(500).json({message:"result error in sendmessage",success:false})
       }
      
        const recieverSocketId=getRecieverSocketId(id)
        if(recieverSocketId)
        {
            io.to(id).emit("newMessage",newMessage)
            return res.status(201).json({newMessage});
        }
        
    }
    catch(error)
    {
        console.log("error in sendMessage controller:",error.message);
        return res.status(500).json({error:"Internal server error",success:false})

    }
}