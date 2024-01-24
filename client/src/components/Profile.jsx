import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { viewProfileThunk } from "../redux/profileSlice";
import ChatList from "./ChatList";
import image from "../assets/profile.png";

const Profile = () => {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const dispatch = useDispatch();
  const [profile, setProfile] = useState();

  useEffect(() => {
    dispatch(viewProfileThunk())
      .then((res) => {
        setProfile(res.payload.data.user);
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  }, []);

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

      <div className="lg:ml-[300px] bg-black h-screen md:ml-0 sm:ml-0 !important  text-white">
        <div
          className="flex flex-col justify-center items-center"
          key={profile?.id}
        >
          <h1 className="text-4xl font-bold p-3 ">Profile</h1>
        </div>
        <div>
          <h1 className="text-3xl p-3 text-center m-8 font-semibold">
            My Information
          </h1>
          <div className="flex flex-col justify-center items-center">
            <img
              src={image}
              className="rounded-full w-40 h-40 border-white border border-white border-10"
              alt=""
            />
          </div>

          <ul className="list-none p-0">
            <li className="p-3  transition duration-500 text-center ease-in-out transform hover:bg-gray-400 mt-5 hover:scale-90">
              <span>Email:</span> {profile ? profile.email : ""}
            </li>

            <li className="p-3  transition duration-500 text-center ease-in-out transform  hover:bg-gray-400 hover:scale-90">
              <span>Username:</span> @{profile ? profile.username : ""}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Profile;
