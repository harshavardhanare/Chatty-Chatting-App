import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MessageSquare, LogOut, User, Home, Settings } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { motion } from "framer-motion";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }} 
      className="bg-white shadow-md fixed w-full top-0 z-40 backdrop-blur-lg bg-opacity-80"
    >
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        
        {/* Logo & Brand */}
        <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition">
          <motion.div 
            whileHover={{ scale: 1.1 }} 
            className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center"
          >
            <MessageSquare className="w-5 h-5 text-purple-600" />
          </motion.div>
          <h1 className="text-lg font-bold text-gray-800">Chatty</h1>
        </Link>

        {/* Navigation Links */}
        {authUser ? (
          <nav className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition">
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
            <Link to="/profile" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition">
              <User className="w-5 h-5" />
              <span>Profile</span>
            </Link>
            <Link to="/settings" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>

            {/* User & Logout */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </motion.button>
          </nav>
        ) : (
          <div className="flex gap-4">
            <Link to="/login" className="text-gray-700 hover:text-purple-600 transition">Login</Link>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Link to="/signup" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
                Sign Up
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </motion.header>
  );
};

export default Navbar;
