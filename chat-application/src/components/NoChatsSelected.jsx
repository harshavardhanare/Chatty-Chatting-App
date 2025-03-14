import React from "react";
import { MessageSquare } from "lucide-react";

export const NoChatsSelected = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-base-100">
      <div className="max-w-md text-center space-y-6 mb-40">
        
        {/* Icon Display */}
        <div className="flex justify-center ">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce">
            <MessageSquare className="w-8 h-8 text-primary" />
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">Welcome to Chatty!</h2>
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};
