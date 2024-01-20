import React from "react";
import { getSender } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { accessChatThunk, setSelectedChat } from "../redux/chatSlice";
import toast from "react-hot-toast";

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
  console.log(selectedChat);
  return (
    <div>
      <h1
        className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1 w-full text-[18px]"
        onClick={handleChat}
      >
        {getSender(props.userId, props.users)}
      </h1>
    </div>
  );
};

export default ChatListUser;
