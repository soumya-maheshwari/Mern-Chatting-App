import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allMessagesThunk } from "../redux/messageSlice";
import ChatHeader from "./ChatHeader";
import { ColorRing } from "react-loader-spinner";
import bg1 from "../assets/bg3.svg";
import "./style.css";

const Chats = ({ selectedChat }) => {
  const dispatch = useDispatch();
  const containerRef = useRef();

  // const [messages, setMessages] = useState([]);

  useEffect(() => {
    dispatch(allMessagesThunk(selectedChat))
      .then((res) => {
        console.log(res);
        // setMessages(res.payload.data.messages);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  }, [selectedChat]);

  const messages = useSelector((state) => state.message.messages);
  const userId = JSON.parse(localStorage.getItem("userInfo"))?.id;

  useEffect(() => {
    // Scroll to the bottom when messages change
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [messages]);

  return (
    <>
      <ChatHeader selectedChat={selectedChat} />

      <div
        ref={containerRef}
        className=" flex-1 w-full  overflow-y-auto rounded-lg p-6
      max-h-[80%]"
        style={{
          backgroundImage: `url(${bg1})`,
          backgroundSize: "cover",
        }}
      >
        {messages ? (
          <div className="flex flex-col space-y-2">
            {messages.map((message) => (
              <div
                key={message._id}
                className={`flex ${
                  message.sender._id === userId
                    ? "items-end justify-end"
                    : "items-start"
                }`}
              >
                <div
                  className={`${
                    message.sender._id === userId
                      ? "bg-green-500"
                      : "bg-pink-500"
                  } p-3 rounded-lg`}
                >
                  <p
                    className={`text-sm ${
                      message.sender._id === userId
                        ? "text-white"
                        : "text-white"
                    }`}
                  >
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="loader-container w-[100%] mx-auto flex items-center justify-center">
            <ColorRing
              visible={true}
              height="50"
              width="50"
              ariaLabel="color-ring-loading"
              wrapperStyle={{
                display: "flex",
                alignItems: "center",
              }}
              wrapperClass="color-ring-wrapper"
              colors={["#131324", "#1b64d8", "#1010b0", "#131324", "#020217"]}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Chats;
