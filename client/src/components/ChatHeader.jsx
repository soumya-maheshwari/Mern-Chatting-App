import React from "react";
import { getOtherUser } from "../utils/utils";

const ChatHeader = ({ selectedChat }) => {
  if (!selectedChat) {
    return null;
  }
  console.log(selectedChat);
  const otherUserId = selectedChat.users.find(
    (userId) => userId !== selectedChat.currentUser
  );

  return (
    <div className="bg-gray-800 p-2 text-white">
      {getOtherUser(otherUserId)}
    </div>
  );
};

export default ChatHeader;
