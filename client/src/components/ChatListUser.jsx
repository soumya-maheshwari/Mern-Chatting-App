import React from "react";
import { getSender, getSenderPhoto } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { accessChatThunk, setSelectedChat } from "../redux/chatSlice";
import toast from "react-hot-toast";
import photo from "../assets/profile.png";

const ChatListUser = (props) => {
  const dispatch = useDispatch();

  const handleChat = () => {
    const userId = props.user2Id;

    dispatch(accessChatThunk({ userId }))
      .then((res) => {
        console.log(res);
        console.log(res.payload.data.success);
        if (res.payload.data.success) {
          toast.success(`${res.payload.data.msg}`);
          dispatch(setSelectedChat(props.chatId));
        } else {
          toast.error(`${res.payload.data.msg}`);
        }
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  };

  const selectedChat = useSelector((state) => state.chat.selectedChat);
  const isSelectedChat = useSelector(
    (state) => state.chat.selectedChat === props.chatId
  );
  console.log(selectedChat);
  return (
    <div
      className={`flex cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1 w-full text-[18px] 
       gap-3 mb-3 
       ${isSelectedChat ? "text-white bg-gray-600" : ""}`}
    >
      <img
        src={getSenderPhoto(props.userId, props.users) || photo}
        className="rounded-full w-10 h-10 border-white border border-white border-10 cursor-pointer"
        alt=""
      />

      <h1
        className="cursor-pointer p-1  rounded-md mt-1 w-full text-[16px]"
        onClick={handleChat}
      >
        {getSender(props.userId, props.users)}
      </h1>
    </div>
  );
};

export default ChatListUser;
