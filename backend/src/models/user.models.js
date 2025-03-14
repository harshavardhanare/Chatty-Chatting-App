import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    emails: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        }
    },
    fullname: {
        type: String,
        required: [true, "Full name is required"],
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"]
    },
    profilepic: {
        type: String,
        default: ""
    }
}, { timestamps: true });

// Create a unique index on emails
userSchema.index({ emails: 1 }, { unique: true });

const User = mongoose.model("User", userSchema);
export default User;