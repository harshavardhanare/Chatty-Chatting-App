import React, { useState } from "react";
import { MessageSquare, Mail, Lock, User, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import Navbar

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateform();
    if (success) {
      try {
        const res = await signup(formData);
        console.log(res, "res");
        if (res.success) return navigate("/login");
      } catch (error) {
        console.error("Signup error:", error);
      }
    }
  };

  const validateform = () => {
    if (!formData.fullname.trim()) {
      toast.error("Full name is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("❌ Password must be at least 6 characters", {
        style: {
          borderRadius: "10px",
          background: "#fff",
          color: "#ff4d4f",
          fontWeight: "bold",
        },
        icon: "🚫",
      });
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      {/* Navbar */}
      <Navbar/>

      <div className="grid lg:grid-cols-2 mt-16">
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center items-center p-8"
        >
          {/* Logo */}
          <motion.div
            className="flex items-center mb-6 gap-2 text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <MessageSquare className="size-10 text-white" />
            <h1 className="text-3xl font-bold">ChatApp</h1>
          </motion.div>

          {/* Card */}
          <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-6">
            <motion.div
              className="text-center mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex flex-col items-center gap-2 group">
                <div className="size-14 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <MessageSquare className="size-8 text-purple-600" />
                </div>
                <h1 className="text-2xl font-bold mt-2 text-gray-800">
                  Create Account
                </h1>
                <p className="text-gray-500">
                  Get started with your free account
                </p>
              </div>
            </motion.div>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* Full Name */}
              <div className="form-control relative">
                <label className="label text-gray-600">Full Name</label>
                <div className="flex items-center border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-purple-500">
                  <User className="text-gray-400 mx-2" />
                  <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    className="w-full outline-none bg-transparent"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="form-control relative">
                <label className="label text-gray-600">Email</label>
                <div className="flex items-center border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500">
                  <Mail className="text-gray-400 mx-2" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full outline-none bg-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-control relative">
                <label className="label text-gray-600">Password</label>
                <div className="flex items-center border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-red-500">
                  <Lock className="text-gray-400 mx-2" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full outline-none bg-transparent"
                    placeholder="Create a password"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full p-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition duration-300 flex justify-center items-center"
                disabled={isSigningUp || submitted}
              >
                {submitted ? (
                  <>
                    <CheckCircle className="size-5 mr-2" /> Signed Up!
                  </>
                ) : isSigningUp ? (
                  "Signing Up..."
                ) : (
                  "Sign Up"
                )}
              </motion.button>
            </motion.form>

            {/* Already have an account? */}
            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-purple-600 hover:underline">
                Login
              </a>
            </p>
          </div>
        </motion.div>

        {/* Right Side with Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex items-center justify-center bg-gradient-to-b from-blue-400 to-purple-400"
        >
          <img
            // Replace with your image URL
            alt="Signup Illustration"
            className="w-2/3 drop-shadow-lg"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpPage;
