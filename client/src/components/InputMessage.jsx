import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendMessageThunk } from "../redux/messageSlice";
import toast from "react-hot-toast";

const InputMessage = ({ selectedChat }) => {
  const dispatch = useDispatch();

  const [content, setContent] = useState("");

  const sendMessageFun = () => {
    const data = {
      content,
      chatId: selectedChat,
    };

    console.log(data);
    dispatch(sendMessageThunk(data))
      .then((res) => {
        console.log(res);
        console.log(res.payload.data.success);
        if (res.payload.data.success) {
          toast.success(`${res.payload.data.msg}`);
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
  return (
    <div className="mt-4 w-full flex  items-center">
      <input
        type="text"
        placeholder="Type your message... 🚀."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none"
      />
      <button
        className="ml-2 bg-pink-500 text-black px-4 py-2 rounded-md"
        onClick={sendMessageFun}
      >
        Send
      </button>
    </div>
  );
};

export default InputMessage;
