import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { singleChatThunk } from "../redux/chatSlice";
import { getSender } from "../utils/utils";

const ChatHeader = ({ selectedChat }) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  if (!selectedChat) {
    return null;
  }
  console.log(selectedChat);

  const userId = JSON.parse(localStorage.getItem("userInfo"))?.id;

  useEffect(() => {
    dispatch(singleChatThunk(selectedChat)).then((res) => {
      console.log(res);
      setName(getSender(userId, res.payload.data.chat.users));
      return res;
    });
  }, [selectedChat]);

  return (
    <>
      <h2 className="text-xl font-bold mb-4 text-white text-center">@{name}</h2>
    </>
  );
};

export default ChatHeader;
