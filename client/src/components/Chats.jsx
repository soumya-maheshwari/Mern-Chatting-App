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

  const selectedChatt = useSelector((state) => state.chat.selectedChat);

  useEffect(() => {
    if (selectedChat) {
      dispatch(allMessagesThunk(selectedChat))
        .then((res) => {
          console.log(res);
          return res;
        })
        .catch((err) => {
          console.log(err);
          return err.response;
        });
    }
  }, [selectedChat, dispatch]);

  const messages = useSelector((state) => state.message.messages);
  const userId = JSON.parse(localStorage.getItem("userInfo"))?.id;

  useEffect(() => {
    if (selectedChat && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, selectedChat]);

  return (
    <>
      {selectedChatt ? (
        <>
          <ChatHeader selectedChat={selectedChat} />

          <div
            ref={containerRef}
            className="flex-1 w-full md:w-11/12 overflow-y-auto rounded-lg p-2 max-h-[76%]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #f4f8ff, #e3eefa, #d1e4f5, #bcdcef, #a6d3e7)",
            }}
          >
            {messages ? (
              <div className="flex flex-col space-y-2 mb-1">
                {messages.map((message) => (
                  <div
                    key={message._id}
                    className={`flex ${
                      message.sender._id === userId
                        ? "items-end justify-end"
                        : "items-start"
                    }`}
                  >
                    {message.sender._id !== userId && (
                      <img
                        src={message.sender.photo}
                        alt="profile"
                        className="w-10 h-10 rounded-full mr-2 border border-black"
                      />
                    )}
                    <div className="flex flex-col">
                      {message.content && (
                        <div
                          className={`${
                            message.sender._id === userId
                              ? "bg-green-500"
                              : "bg-gray-500"
                          } p-3 rounded-lg`}
                        >
                          <p
                            className={`md:text-md ${
                              message.sender._id === userId
                                ? "text-white"
                                : "text-white"
                            }`}
                          >
                            {message.content}
                          </p>
                        </div>
                      )}
                      {message.image && (
                        <img
                          src={message.image}
                          className="bg-transparent w-40 h-40 mt-2"
                          alt=""
                        />
                      )}
                    </div>
                    {message.sender._id === userId && (
                      <img
                        src={message.sender.photo}
                        alt="profile"
                        className="w-10 h-10 rounded-full ml-2 border border-black"
                      />
                    )}
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
                  colors={[
                    "#131324",
                    "#1b64d8",
                    "#1010b0",
                    "#131324",
                    "#020217",
                  ]}
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <div
          className="flex-1 w-full md:w-11/12 overflow-y-auto rounded-lg p-2 max-h-[76%]"
          // className="w-full overflow-y-auto rounded-lg p-6 max-h-[80%]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #f4f8ff, #e3eefa, #d1e4f5, #bcdcef, #a6d3e7)",
            backgroundSize: "cover",
          }}
        >
          <h1 className="text-center w-full h-screen text-2xl mb-6 font-bold">
            Click on a user to start chatting!
          </h1>
        </div>
      )}
    </>
  );
};

export default Chats;
