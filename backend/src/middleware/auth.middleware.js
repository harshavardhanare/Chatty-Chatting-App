import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import {config} from  "dotenv"
config();
export const protectRoute = async (req, res, next) => {
  try {
    // Get the token from the cookie
    const token = req.cookies.jwt;
  
    // Check if the token exists
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided", success: false });
    }
console.log("jwtkey",process.env.JWT_SECRET)
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use environment variable for JWT secret
 
    // Check if the token is valid
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized: Invalid token", success: false });
    }

    // Find the user in the database
    const user = await User.findById(decoded.userId).select("-password");

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    // Attach the user to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error in protectRoute:", error.message);

    // Handle specific JWT errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Unauthorized: Invalid token", success: false });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized: Token expired", success: false });
    }

    // Generic error response
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};