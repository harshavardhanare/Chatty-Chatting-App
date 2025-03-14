import React, { useState } from "react";
import { MessageSquare, Mail, Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await login(formData);
        if (res.success) return navigate("/");
      } catch (error) {
        console.error("Login error:", error);
      }
    }
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      <Navbar />
      <div className="grid lg:grid-cols-2 mt-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center items-center p-8"
        >
          <motion.div className="flex items-center mb-6 gap-2 text-white">
            <MessageSquare className="size-10 text-white" />
            <h1 className="text-3xl font-bold">ChatApp</h1>
          </motion.div>

          <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-6">
            <motion.div className="text-center mb-4">
              <div className="flex flex-col items-center gap-2 group">
                <div className="size-14 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <MessageSquare className="size-8 text-purple-600" />
                </div>
                <h1 className="text-2xl font-bold mt-2 text-gray-800">Login</h1>
                <p className="text-gray-500">Sign in to your account</p>
              </div>
            </motion.div>

            <motion.form onSubmit={handleSubmit} className="space-y-6">
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

              <div className="form-control relative">
                <label className="label text-gray-600">Password</label>
                <div className="flex items-center border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-red-500">
                  <Lock className="text-gray-400 mx-2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full outline-none bg-transparent"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="ml-2 text-gray-500 focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full p-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition duration-300 flex justify-center items-center"
                disabled={isLoggingIn || submitted}
              >
                {submitted ? (
                  <>
                    <CheckCircle className="size-5 mr-2" /> Logged In!
                  </>
                ) : isLoggingIn ? (
                  "Logging In..."
                ) : (
                  "Login"
                )}
              </motion.button>
            </motion.form>

            <p className="text-center text-gray-600">
              Don't have an account? {" "}
              <a href="/signup" className="text-purple-600 hover:underline">
                Sign Up
              </a>
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex items-center justify-center bg-gradient-to-b from-blue-400 to-purple-400"
        >
          <img
            // Replace with your image URL
            alt="Login Illustration"
            className="w-2/3 drop-shadow-lg"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;