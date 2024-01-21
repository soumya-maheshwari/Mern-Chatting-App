import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { allMessagesThunk, sendMessageThunk } from "../redux/messageSlice";
import toast from "react-hot-toast";
import EmojiPicker from "emoji-picker-react";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:5000";
var socket;

const InputMessage = ({ selectedChat }) => {
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emojiObject) => {
    const emoji = emojiObject.emoji;
    setContent((prevContent) => prevContent + emoji);
  };

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
          setContent("");
          socket.emit("new message", res.payload.data.message);
          toast.success(`${res.payload.data.msg}`);
          dispatch(allMessagesThunk(selectedChat));
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

  useEffect(() => {
    socket = io(ENDPOINT);
    // socket.emit("setup", user);
    // socket.on("connected", () => setSocketConnected(true));
    // socket.on("typing", () => setIsTyping(true));
    // socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  return (
    <div className="mt-4 w-full flex items-center ">
      <input
        type="text"
        placeholder="Type message... 🚀."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 p-2 border  border-gray-300 rounded-md focus:outline-none sm:w-300px"
        style={{
          width: "100%",
        }}
      />
      <span
        role="img"
        aria-label="emoji"
        className="ml-2 hidden sm:flex"
        style={{ cursor: "pointer", fontSize: "1.5rem" }}
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
      >
        😊
      </span>
      <button
        className="ml-2 bg-pink-500 text-black px-2 py-2 rounded-md"
        onClick={sendMessageFun}
      >
        Send
      </button>
      {showEmojiPicker && (
        <div
          className="flex bottom-full z-10 hidden sm:flex mb-9"
          style={{
            position: "absolute",
            bottom: "45px",
            right: "0",
            zIndex: "10",
            width: window.innerWidth > 768 ? "400px" : "300px",
            transition: "width 0.3s ease",
          }}
        >
          <EmojiPicker
            onEmojiClick={(emoji) => handleEmojiClick(emoji)}
            disableSearchBar
          />
        </div>
      )}
    </div>
  );
};

export default InputMessage;
