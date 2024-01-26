import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedChat, singleChatThunk } from "../redux/chatSlice";
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

  const handleGoBack = () => {
    dispatch(setSelectedChat(null));
  };

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
      <div className="flex">
        <i
          className="bi bi-arrow-left text-white cursor-pointer mr-4 "
          onClick={handleGoBack}
        ></i>
        <h2 className="text-xl font-bold mb-4 text-white text-center">
          @{name}
        </h2>
      </div>
    </>
  );
};

export default ChatHeader;
