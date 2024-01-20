import React from "react";
import { useDispatch, useSelector } from "react-redux";
import InputMessage from "./InputMessage";
import Chats from "./Chats";

const ChatScreen = () => {
  const dispatch = useDispatch();

  const selectedChat = useSelector((state) => state.chat.selectedChat);

  return (
    <div className="bg-blue-600 flex flex-col items-center justify-center h-screen p-4">
      <h2 className="text-xl font-bold mb-4 text-white text-center">
        Chat Screen
      </h2>

      <Chats selectedChat={selectedChat} />

      {/* <Chats selectedChat={selectedChat} /> */}
      <InputMessage selectedChat={selectedChat} />
    </div>
  );
};

export default ChatScreen;
