import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allChatsThunk } from "../redux/chatSlice";
import { getSender } from "../utils/utils";
import { toast } from "react-hot-toast";
import { searchUserThunk } from "../redux/profileSlice";
import { ColorRing } from "react-loader-spinner";

const ChatList = () => {
  const dispatch = useDispatch();

  const [loadingUser, setLoadingUser] = useState(false);
  const [search, setSearch] = useState("");
  const [onSearch, setOnSearch] = useState([]);

  const chats = useSelector((state) => state.chat.chatList);
  console.log(chats);

  const handleSearch = async (query) => {
    setSearch(query);
    // console.log(search);
    if (!query) {
      return;
    } else {
      try {
        setLoadingUser(true);
        dispatch(searchUserThunk(search))
          .then((res) => {
            console.log(res);
            setOnSearch(res.payload.data.user);

            if (res.payload.data.user.length > 0) {
              setLoadingUser(false);
            }
            return res;
          })
          .catch((err) => {
            console.log(err);
            return err.response;
          });
      } catch (error) {
        console.log(error);
        return error.response;
      }
    }
  };

  const handleUserSearch = () => {
    if (!search) {
      toast.error("Please enter user name to search");
      return;
    }
    dispatch(searchUserThunk(search))
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  };

  const dropDown = () => {
    document.querySelector("#submenu").classList.toggle("hidden");
    document.querySelector("#arrow").classList.toggle("rotate-180");
  };

  const openSidebar = () => {
    document.querySelector(".sidebar").classList.toggle("left-[-300px]");
  };

  const userId = JSON.parse(localStorage.getItem("userInfo"))?.id;
  console.log(userId);
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
          <div className="p-2.5 mt-1 flex items-center">
            {/* <h1 className="font-bold text-gray-200 ">My Chats</h1> */}
          </div>

          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700">
            <i className="bi bi-search text-sm" onClick={handleUserSearch}></i>
            <input
              className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
              placeholder="Search user"
              value={search}
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleUserSearch();
                }
              }}
            />
          </div>
          {loadingUser ? (
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
                colors={["#c3c3df", "#8ca3c7", "#8282f7", "#c4c4de", "#d6d6df"]}
              />
            </div>
          ) : (
            <>
              <div
                className=" leading-7 p-2.5 mt-1 text-left items-center text-sm font-medium mt-2"
                id="sub-menu"
              >
                {onSearch?.slice(0, 4).map((user) => {
                  return (
                    <>
                      <h1 className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1 w-full text-[18px]">
                        {user.username}
                      </h1>
                      <br />
                    </>
                  );
                })}
              </div>
            </>
          )}
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
                // console.log(chat);
                <>
                  <h1 className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1 w-full text-[18px]">
                    {getSender(userId, chat.users)}
                  </h1>
                </>
              ))}
          </div>

          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600">
            <i className="bi bi-box-arrow-in-right"></i>
            <span className="text-[15px] ml-4 text-gray-200">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
