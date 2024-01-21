import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allChatsThunk, setSelectedChat } from "../redux/chatSlice";
import { getSender } from "../utils/utils";
import { toast } from "react-hot-toast";
import { searchUserThunk } from "../redux/profileSlice";
import { ColorRing } from "react-loader-spinner";
import SearchUser from "./Search/SearchUser";
import ChatListUser from "./ChatListUser";
import { useNavigate } from "react-router-dom";

const ChatList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const chats = useSelector((state) => state.chat.chatList);

  const [chats, setChats] = useState([]);
  // const selectedChat = useSelector((state) => state.chat.selectedChat);

  const dropDown = () => {
    document.querySelector("#submenu").classList.toggle("hidden");
    document.querySelector("#arrow").classList.toggle("rotate-180");
  };

  const openSidebar = () => {
    document.querySelector(".sidebar").classList.toggle("left-[-300px]");
  };

  const fetchChats = () => {
    dispatch(allChatsThunk())
      .then((res) => {
        console.log(res);
        setChats(res.payload.data.chats);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  };
  useEffect(() => {
    fetchChats();
  }, []);

  const handleChatClick = (chatId) => {
    // dispatch(setSelectedChat(chatId));
  };

  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();
    dispatch(setSelectedChat(null));
    toast.success("Logout successful");
    navigate("/");
  };

  const userId = JSON.parse(localStorage.getItem("userInfo"))?.id;
  return (
    <div className="">
      <div className="sidebar fixed top-0 bottom-0  p-2 w-[300px] overflow-y-auto text-center bg-backgroundColor">
        <div className="text-gray-100 text-xl sm:ml-0">
          <div className="p-2.5 mt-1 flex items-center">
            <h1 className="font-bold text-gray-200 ">soumya</h1>
            <i
              className="bi bi-x ml-40 cursor-pointer lg:hidden"
              onClick={openSidebar}
            ></i>
          </div>
          <hr className="my-2 text-gray-600" />

          <SearchUser />

          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600">
            <i className="bi bi-chat-left-text-fill"></i>
            <div
              className="flex justify-between w-full items-center"
              onClick={dropDown}
            >
              <span className="text-[15px] ml-4  text-gray-200">My Chats</span>
              <span className="text-sm rotate-180" id="arrow">
                <i className="bi bi-chevron-down"></i>
              </span>
            </div>
          </div>

          <div
            className=" leading-7 p-2.5 mt-1 text-left items-center text-sm font-thin mt-2"
            id="submenu"
          >
            {chats &&
              chats.map((chat) => (
                <>
                  <div onClick={handleChatClick(chat._id)} key={chat._id}>
                    <ChatListUser
                      user2Id={chat.users[1]._id}
                      userId={userId}
                      users={chat.users}
                      chatId={chat._id}
                    />
                  </div>
                </>
              ))}
          </div>

          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600">
            <i className="bi bi-box-arrow-in-right"></i>
            <span
              className="text-[15px] ml-4 text-gray-200"
              onClick={handleLogout}
            >
              Logout
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
