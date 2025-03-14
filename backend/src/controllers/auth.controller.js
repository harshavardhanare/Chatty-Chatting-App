import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/util.js"
import User from "../models/user.models.js"
import bcrypt from "bcryptjs"




export const signup = async (req, res) => {
    const { fullname, email, password } = req.body;
    
    try {
        // Validate input fields
        console.log(fullname,email,password)
        if (!email || !fullname || !password) {
            return res.status(400).json({ 
                message: "All fields are required", 
                success: false 
            });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ 
                message: "Password must be at least 6 characters", 
                success: false 
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ emails:email});
        if (existingUser) {
            return res.status(400).json({ 
                message: "Email already exists", 
                success: false 
            });
        }
        console.log("existing",existingUser)

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            fullname,
            emails:email,
            password: hashedPassword
        });

        // Save user
        console.log(newUser)
        const  created=await newUser.save();
        console.log("created",created)

        // Generate token
        // generateToken(newUser._id, res);

        // Respond with success
        return res.status(201).json({ 
            message: "User stored successfully",
            success: true
        });

    } catch (error) {
        console.error("Error in signup controller:", error);
        return res.status(500).json({ 
            message: "Internal server error", 
            success: false,
            error: error.message 
        });
    }
};

export const login=async(req,res)=>{
  const {email,password}=req.body
  console.log("logindata",{email,password})
  try{
    const user=await User.findOne({emails:email})
  
    if(!user)
    {
        console.log("errorrr occured")
        return res.status(400).json({message:"usernot found",success:false})
    }
    const ispassword=await bcrypt.compare(password,user.password);
   
    if(!ispassword)
        return res.status(400).json({message:"password is wrong",success:false})
generateToken(user._id,res)
res.status(200).json({_id:user._id,
    fullname:user.fullname,
    email:user.emails,
    profilepic:user.profilepic,
    success:true
})
}
  catch(err)
  {
    console.log("error in controller",err.message)
    return res.status(500).json({message:"Internal server error",success:false})
  }
}
export const logout=async(req,res)=>{
    
    try{
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"logouted successfully",success:true})

    }
    catch(error)
    {
        console.log("error in  logout controller ",error.messsage)
    }
}
export const updateProfile=async (req,res)=>{
    try {
        const {profilepic}=req.body;
       
        const userId=req.user._id
        if(!profilepic)
          {  return res.status(400).json({message:"profile pic is required",success:false})}
        const uploadResponce=await cloudinary.uploader.upload(profilepic)
        const updatedUser=await User.findByIdAndUpdate(userId,{profilepic:uploadResponce.secure_url},{new:true})
      
        return res.status(200).json(updatedUser)
    } catch (error) {
        console.log("error in updateprofile",error.message)
        return res.status(500).json({message:"unalble to update",success:false})
    }
}


export const checkAuth = async (req, res) => {
    try {
      // Check if the user is authenticated
      if (!req.user) {
        return res.status(401).json({ message: "Not authenticated", success: false });
      }
  
      // Return the authenticated user
      res.status(200).json({
        message: "User is authenticated",
        success: true,
        user: req.user,
      });
    } catch (error) {
      console.error("Error in checkAuth controller:", error.message);
  
      // Return a generic error response
      res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };