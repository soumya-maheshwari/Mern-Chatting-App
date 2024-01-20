import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { allMessagesThunk } from "../redux/messageSlice";
import { getSender } from "../utils/utils";

const Chats = ({ selectedChat }) => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    dispatch(allMessagesThunk(selectedChat))
      .then((res) => {
        console.log(res);
        setMessages(res.payload.data.messages);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  }, [selectedChat]);

  const userId = JSON.parse(localStorage.getItem("userInfo"))?.id;

  return (
    <>
      <div className="bg-white flex-1 w-full overflow-y-auto rounded-lg p-6">
        {/* {getSender(userId, selectedChat)} */}
        <div className="flex flex-col space-y-2">
          {messages.map((message) => (
            <div
              key={message._id} // Make sure each message has a unique key
              className={`flex ${
                message.sender._id === userId
                  ? "items-end justify-end"
                  : "items-start"
              }`}
            >
              <div
                className={`${
                  message.sender._id === userId ? "bg-green-500" : "bg-gray-200"
                } p-3 rounded-lg`}
              >
                <p
                  className={`text-sm ${
                    message.sender._id === userId ? "text-black" : ""
                  }`}
                >
                  {message.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Chats;
