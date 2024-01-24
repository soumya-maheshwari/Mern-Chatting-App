import React from "react";

const VideoDisplay = ({ videoUrl }) => {
  return (
    <div className="flex mt-[-190px] items-center justify-center ">
      <video controls className="w-56 h-56 border">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoDisplay;
