import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { allMessagesThunk, sendMessageThunk } from "../redux/messageSlice";
import toast from "react-hot-toast";
import EmojiPicker from "emoji-picker-react";
import FormData from "form-data";
import ImageDisplay from "./ImageDisplay";
import VideoDisplay from "./VideoDisplay";
import sentAudio from "../assets/sentmessage.mp3";

const InputMessage = ({ selectedChat }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const fd = new FormData();
  const videoFileInputRef = useRef(null);
  const audioRef = useRef(null);

  const [content, setContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [sendImage, setSendImage] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [videoUpload, setVideoUpload] = useState(null);
  const [sendVideo, setSendVideo] = useState(null);

  const handleImageIconClick = () => {
    fileInputRef.current.click();
  };

  const handleVideoIconClick = () => {
    videoFileInputRef.current.click();
  };

  const handleSendImage = (e, index) => {
    setImageUpload(URL.createObjectURL(e.target.files[0]));
    setSendImage(e.target.files[0]);
  };

  const handleSendVideo = (e) => {
    setVideoUpload(URL.createObjectURL(e.target.files[0]));
    setSendVideo(e.target.files[0]);
  };

  const handleEmojiClick = (emojiObject) => {
    const emoji = emojiObject.emoji;
    setContent((prevContent) => prevContent + emoji);
  };

  const sendMessageFun = () => {
    const data = {
      content,
      chatId: selectedChat,
    };

    console.log(data);

    const formData = new FormData();
    formData.append("content", content);
    formData.append("chatId", selectedChat);

    if (sendImage) {
      formData.append("file", sendImage);
    } else if (sendVideo) {
      formData.append("file", sendVideo);
    }

    dispatch(sendMessageThunk(formData))
      .then((res) => {
        console.log(res);
        console.log(res.payload.data.success);
        if (res.payload.data.success) {
          setContent("");
          toast.success(`${res.payload.data.msg}`);

          // Play the audio when the message is sent
          audioRef.current.play();

          setSendImage(null);
          setImageUpload(null);

          setSendVideo(null);
          setVideoUpload(null);
          console.log(sendImage);
          dispatch(allMessagesThunk(selectedChat));
        } else {
          toast.error(`${res.payload.data.msg}`);
        }
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  };

  return (
    <>
      {imageUpload && <ImageDisplay imageUrl={imageUpload} />}
      {videoUpload && <VideoDisplay videoUrl={videoUpload} />}
      {/* audio element */}
      <audio ref={audioRef} src={sentAudio} style={{ display: "none" }} />
      <div className="mt-4 w-full md:w-11/12 flex items-center">
        <input
          type="text"
          placeholder="Start typing.."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 p-2 border  border-gray-300 rounded-md focus:outline-none sm:w-700px"
          style={{
            width: "calc(100% - 80px)",
          }}
        />

        <span
          role="img"
          aria-label="emoji"
          className="ml-2 hidden sm:flex"
          // style={{ cursor: "pointer", fontSize: "1.5rem", marginRight: "10px" }}
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          {/* 😊 */}
        </span>

        <div className="p-2.5  right-40  flex items-center rounded-md px-4 duration-300 cursor-pointer">
          <span
            role="img"
            aria-label="emoji"
            className="ml-2  sm:flex"
            // style={{
            //   cursor: "pointer",
            //   fontSize: "1.5rem",
            //   marginRight: "10px",
            // }}
            onClick={handleImageIconClick}
          >
            {/* 🖼️ */}
          </span>
          <div>
            <input
              type="file"
              name="file"
              accept="image/png, image/jpg, image/jpeg"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={(e) => {
                handleSendImage(e);
              }}
              // hidden
            />
          </div>

          {/* <div
            className="p-2.5 absolute top-1/2 transform -translate-y-1/2 right-1  flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-gray-600"
            onClick={handleVideoIconClick}
          >
            <i className="bi bi-play-btn"></i>
            <input
              type="file"
              name="file"
              accept="video/mp4, video/x-m4v, video/*"
              style={{ display: "none" }}
              ref={videoFileInputRef}
              onChange={handleSendVideo}
              // hidden
            />
          </div> */}
        </div>

        <button
        // className="ml-2 bg-pink-500 text-black px-2 py-2 rounded-md"
        // onClick={sendMessageFun}
        >
          {/* Send */}
        </button>

        {showEmojiPicker && (
          <div
            className="flex bottom-full z-10 hidden sm:flex mb-9"
            style={{
              position: "absolute",
              bottom: "45px",
              right: "0",
              zIndex: "10",
              width: window.innerWidth > 768 ? "400px" : "300px",
              transition: "width 0.3s ease",
            }}
          >
            <EmojiPicker
              onEmojiClick={(emoji) => handleEmojiClick(emoji)}
              disableSearchBar
            />
          </div>
        )}
      </div>
    </>
  );
};

export default InputMessage;
