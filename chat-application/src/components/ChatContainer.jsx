import React, { useRef } from 'react'
import { useChatStore } from '../store/useChatStore'

import MessageInput from './MessageInput'
import { useEffect } from 'react'
import ChatHeader from './ChatHeader'
import MessageSkeleton from './skeletons/MessageSkeleton'
import { useAuthStore } from '../store/useAuthStore'
import { formatMessageTime } from '../lib/utils'
export const ChatContainer = () => {
  const {messages,getMessages,isMessagesLoading,selectedUser,subscribeToMessages,unsubscribeFromMessages}=useChatStore()
  const messageEndRef=useRef(null)
  const {authUser} =useAuthStore()
  useEffect(()=>{
getMessages(selectedUser._id)

subscribeToMessages();
return()=>unsubscribeFromMessages();
  },[selectedUser._id,getMessages,subscribeToMessages,unsubscribeFromMessages])
useEffect(()=>{
  if(messageEndRef.current && messages)
  {
    messageEndRef.current.scrollIntoView({behavior:"smooth"})

  }
},[messages])
  if(isMessagesLoading) return (
    <div className='flex-1flex flex-col overflow-auto'>
      <ChatHeader/>
      <MessageSkeleton/>
      <MessageInput/>
    </div>
    )
  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader/>
     
     <div className='flex-1 overflow-y-auto p-4 space-y-4'>
     {messages.map((message) => {
  console.log("auth userId", authUser.user);
  if (!message || !message._id) return null;
  return ( // ✅ ADD return here
    <div key={message._id} className={`chat ${message.senderId === authUser.user._id ? "chat-end" : "chat-start"}`}
    ref={messageEndRef}>
      <div className='chat-image avatar'>
        <div className='size-10 rounded-full border'>
          <img  // ✅ Changed <image> to <img> (correct JSX tag)
            src={message.senderId === authUser.user._id 
              ? authUser.user.profilepic || "/avatar.png" 
              : selectedUser.profilepic || "/avatar.png"} 
            alt="profile pic"
          />
        </div>
      </div>
      <div className='chat-header mb-1'>
        <time className='text-xs opacity-50 ml-1'>
          {formatMessageTime(message.createdAt)}
        </time>
      </div>
      <div className="chat-bubble flex flex-col">
        {message.image && (
          <img src={message.image}
          alt="Attachment"
          className='sm:max-w-[200px] rounded-md mb-2'></img>
        )}
        {message.text && <p>{message.text}</p>}
      </div>
    </div>
  );
})}

     </div>
      <MessageInput/>

    </div>
  )
}
