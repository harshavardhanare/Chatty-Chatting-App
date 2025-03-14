import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "react-hot-toast";
import { Camera, Loader } from "lucide-react";

const ProfilePage = () => {
 
  const { authUser, isCheckingAuth, updateProfile, checkAuth } = useAuthStore();
  const [isUploading, setIsUploading] = useState(false);
  const [user, setUser] = useState({
    emails: "",
    fullname: '',
    profilepic: "",
  });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  useEffect(() => {
    if (authUser && authUser.user) {
      setUser(authUser.user);
    }
  }, [authUser]);

  // Prevent error before `user` is available
  if (isCheckingAuth && !user) {
    return (
      <div className="h-screen flex justify-center items-center bg-gray-900 text-white">
        <Loader className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      try {
        setIsUploading(true);
        
        // Create a copy of the current user data
        const updatedUser = { ...user, profilepic: base64Image };
        
        // Update local state immediately to show the new image
        setUser(updatedUser);
        
        // Send the update to the server
        const res = await updateProfile({ profilepic: base64Image });
        
        if (res) {
          toast.success("Profile picture updated successfully!");
        }
      } catch (error) {
        // Revert to the previous image if there's an error
        setUser({ ...user });
        toast.error("Failed to upload profile picture.");
        console.error("Profile picture upload error:", error);
      } finally {
        setIsUploading(false);
      }
    };
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-900 text-white">
      <div className="max-w-md w-full bg-gray-800 p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-semibold text-center">Profile</h1>
        <p className="text-center text-gray-400">Your profile information</p>

        {/* Avatar Upload Section */}
        <div className="flex flex-col items-center mt-6">
          <div className="relative">
            <img
              src={user?.profilepic || "/vite.svg"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-600"
            />

            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 bg-gray-700 p-2 rounded-full cursor-pointer hover:bg-gray-600"
            >
              <Camera className="w-6 h-6 text-white" />
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          {isUploading && <p className="text-sm text-gray-400 mt-2">Uploading...</p>}
        </div>

        {/* Profile Information */}
        <div className="mt-6">
          <label className="block text-gray-400">Full Name</label>
          <input 
            type="text" 
            className="w-full bg-gray-700 p-2 rounded-lg mt-1"
            value={user?.fullname || ''} 
            readOnly 
          />

          <label className="block text-gray-400 mt-4">Email Address</label>
          <input 
            type="email" 
            className="w-full bg-gray-700 p-2 rounded-lg mt-1" 
            value={user?.emails || ''} 
            readOnly 
          />
        </div>

        {/* Account Info */}
        <div className="mt-6 bg-gray-700 p-4 rounded-lg">
          <p className="text-gray-400">
            Account Status: <span className="text-green-400">Active</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;