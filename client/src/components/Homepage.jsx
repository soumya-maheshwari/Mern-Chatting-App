import React, { useState } from "react";
import ChatList from "./ChatList";
import ChatScreen from "./ChatScreen";

const HomePage = () => {
  const openSidebar = () => {
    document.querySelector(".sidebar").classList.toggle("left-[-300px]");
  };

  return (
    <>
      <span
        className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
        onClick={openSidebar}
      >
        <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
      </span>
      <ChatList />

      <div className="lg:ml-[300px]  h-screen md:ml-0 sm:ml-0 !important">
        <ChatScreen />
      </div>
    </>
  );
};

export default HomePage;
