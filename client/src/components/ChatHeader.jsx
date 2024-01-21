import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { singleChatThunk } from "../redux/chatSlice";
import { getOtherUser, getSender } from "../utils/utils";

const ChatHeader = ({ selectedChat }) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  if (!selectedChat) {
    return null;
  }
  console.log(selectedChat);

  const userId = JSON.parse(localStorage.getItem("userInfo"))?.id;
  console.log(userId);

  useEffect(() => {
    dispatch(singleChatThunk(selectedChat)).then((res) => {
      console.log(res);

      if (res.payload.data.succes) {
        setName(getSender(userId, res.payload.data.chat.users));
        console.log(getSender(userId, res.payload.data.chat.users));
      }
      return res;
    });
  }, [selectedChat]);

  console.log(name);
  return (
    <>
      <h2 className="text-xl font-bold mb-4 text-white text-center">@{name}</h2>
    </>
  );
};

export default ChatHeader;
