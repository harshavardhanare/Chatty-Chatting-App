import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import {io} from "socket.io-client"


const BaseUrl="http://localhost:5000"
export const useAuthStore = create((set, get) => ({
    authUser:  null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
     onlineUsers:[],
     socket:null,
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            
            console.log("Check Auth Response:", res.data);
            
            
                set({ 
                    authUser: res.data,
                 isCheckingAuth:true
                });
                get().connectSocket();
                
            return res.data
               
            }
        catch (error) {
            console.error("Auth check error:", error);
            set({ 
                authUser: null,
                isCheckingAuth:false
            });
            
            
        }
        finally
        {
            set({isCheckingAuth:false})
        }
        
    },
    
    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            console.log("profilepic dataa",data)
            const res = await axiosInstance.post('/auth/signup', data);
            console.log("Signup response:", res.data);
            toast.success("Account created successfully");
            get().connectSocket();
            return res.data;
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Signup failed";
            toast.error(errorMsg);
            console.error("Signup error:", error);
            throw error;
        } finally {
            set({ isSigningUp: false });
        }
    },
    
    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post('/auth/login', data);
            console.log("Login response:", res.data);
    
            // Save auth data to localStorage
            localStorage.setItem("authUser", JSON.stringify(res.data));
    
            set({ authUser: res.data });
            toast.success("Logged in successfully");
            get().connectSocket();
            return res.data;
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Login failed";
            toast.error(errorMsg);
            console.error("Login error:", error);
            throw error;
        } finally {
            set({ isLoggingIn: false });
        }
    },
    
    logout: async () => {
        try {
            const res=await axiosInstance.post("/auth/logout");
            
            set({ authUser: null ,isCheckingAuth: false});
            console.log("logouted succesfully",res)
            
            localStorage.removeItem("authUser");
            toast.success("Logged out successfully");
           return get().disconnectSocket()
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Logout failed";
            toast.error(errorMsg);
            console.error("Logout error:", error);
        }
    },
    updateProfile:async(data)=>{
    set({isUpdatingProfile:true})
    try{
        console.log("data",data)
        console.log()
        const res=await axiosInstance.put('/auth/update-profile',data)
        set({authUser:res.data})
        toast.success("profile updated successfully");

    }
    catch(error)
    {
        console.log("error occured in update profile:",error);
        toast.error(error.response.data.message);

    }
    finally{
        set({isUpdatingProfile:false})
    }
    },
  connectSocket:()=>{
    const {authUser}=get()
    console.log("authes",authUser)
    if(!authUser || get.socket?.connected)return;
    const socket=io(BaseUrl,{
        query:{
            userId:authUser.user._id,
        }
    })
    socket.connect()
    set({socket:socket})
    socket.on("getOnlineUsers",(userId)=>{
        set({onlineUsers:userId})

    })

  },
  disconnectSocket:()=>{
    console.log("dissconnect socket")
    if(get().socket?.connected) 
        return get().socket.disconnect();
  } 
}));
