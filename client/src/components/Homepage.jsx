import React, { useState } from "react";
import ChatList from "./ChatList";
import ChatScreen from "./ChatScreen";

const HomePage = () => {
  const openSidebar = () => {
    document.querySelector(".sidebar").classList.toggle("left-[-300px]");
  };

  return (
    <>
      <div>
        <span
          className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
          onClick={openSidebar}
        >
          <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
        </span>
        <ChatList />
      </div>

      <ChatScreen />
    </>
  );
};

export default HomePage;
