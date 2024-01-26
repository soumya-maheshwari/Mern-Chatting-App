import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { editProfileThunk, viewProfileThunk } from "../redux/profileSlice";
import ChatList from "./ChatList";
import image from "../assets/profile.png";
import toast from "react-hot-toast";

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
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleImageChange = (event) => {
    // Handle the image selection here
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const fileInputRef = useRef(null);

  const handleUpdateImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const updateProfile = () => {
    const formData = new FormData();

    if (selectedImage) {
      formData.append("file", selectedImage);
    }
    dispatch(editProfileThunk(formData)).then((res) => {
      console.log(res);

      if (res.payload.data.success) {
        toast.success(`${res.payload.data.msg}`);
        // setSelectedImage(null);
      }

      return res;
    });
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

      <div
        className="lg:ml-[300px] bg-black h-screen md:ml-0 sm:ml-0 !important text-white"
        style={{
          backgroundImage:
            "radial-gradient(circle, #120f85, #122190, #13309b, #173ea5, #1e4bae, #2457b8, #2c64c2, #3470cb, #3d7fd7, #488ee4, #539def, #5facfb)",
        }}
      >
        <div
          className="flex flex-col justify-center items-center"
          key={profile?.id}
        >
          {/* <h1 className="text-4xl font-bold p-3 ">Profile</h1> */}
        </div>
        <div>
          <h1 className="text-3xl p-3 text-center m-8 font-semibold">
            My Profile
          </h1>
          <div className="flex flex-col justify-center items-center">
            {/* Profile image */}
            <label htmlFor="imageInput">
              <img
                src={
                  selectedImage
                    ? URL.createObjectURL(selectedImage)
                    : profile?.photo || image
                }
                className="rounded-full w-40 h-40 border-white border border-white border-10 cursor-pointer"
                alt=""
              />
            </label>
            <input
              type="file"
              id="imageInput"
              accept="image/png, image/jpg, image/jpeg"
              name="file"
              ref={fileInputRef}
              hidden
              onChange={handleImageChange}
            />

            <i
              className="bi bi-pencil text-white cursor-pointer"
              onClick={handleUpdateImage}
            ></i>
          </div>

          <ul className="list-none p-0">
            <li className="p-3 transition duration-500 ease-in-out hover:bg-gray-400 mt-5 border-b border-gray-300 text-center">
              <span className="font-semibold">Email:</span>{" "}
              {profile ? profile.email : ""}
            </li>

            <li className="p-3 transition duration-500 ease-in-out hover:bg-gray-400  border-gray-300 text-center">
              <span className="font-semibold">Username:</span> @
              {profile ? profile.username : ""}
            </li>
          </ul>

          {selectedImage && (
            <div className="flex justify-center items-center mt-5">
              <button
                className="ml-2 text-white px-7 py-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
                onClick={updateProfile}
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #06101e, #0d0b18, #0e0610, #090207, #000000)",
                  boxShadow:
                    "6px 9px 3px -1px rgba(255, 255, 255, 0.279), 0 2px 4px -1px rgba(255, 255, 255, 0.06)",
                }}
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
