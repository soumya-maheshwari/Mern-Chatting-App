import React from "react";

const ChatList = () => {
  const dropDown = () => {
    document.querySelector("#submenu").classList.toggle("hidden");
    document.querySelector("#arrow").classList.toggle("rotate-0");
  };

  const openSidebar = () => {
    document.querySelector(".sidebar").classList.toggle("left-[-300px]");
  };

  // dropDown();
  return (
    <div className="">
      <div className="sidebar fixed top-0 bottom-0  p-2 w-[300px] overflow-y-auto text-center bg-backgroundColor">
        <div className="text-gray-100 text-xl">
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
          <div
            className="p-2.5 mt-3 flex items-center rounded-md 
        px-4 duration-300 cursor-pointer  bg-gray-700"
          >
            <i className="bi bi-search text-sm"></i>
            <input
              className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
              placeholder="Search user"
            />
          </div>

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
            className=" leading-7 p-2.5 mt-1 text-left items-center text-sm font-thin mt-2 w-4/5"
            id="submenu"
          >
            <h1 className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1">
              user1
            </h1>
            <h1 className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1">
              user1
            </h1>
            <h1 className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1">
              user1
            </h1>
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
