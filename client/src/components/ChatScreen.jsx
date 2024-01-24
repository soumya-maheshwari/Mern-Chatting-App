import React from "react";
import { useDispatch, useSelector } from "react-redux";
import InputMessage from "./InputMessage";
import Chats from "./Chats";

const ChatScreen = () => {
  const dispatch = useDispatch();

  const selectedChat = useSelector((state) => state.chat.selectedChat);

  return (
    <div
      className=" flex z-0 flex-col items-center justify-center h-screen p-4"
      style={{
        backgroundImage:
          "radial-gradient(circle, #0a3066, #0a2959, #09224c, #081b40, #061434)",
      }}
    >
      <Chats selectedChat={selectedChat} />

      {/* <Chats selectedChat={selectedChat} /> */}
      <InputMessage selectedChat={selectedChat} />
    </div>
  );
};

export default ChatScreen;
