import React from "react";

const ImageDisplay = ({ imageUrl }) => {
  return (
    <div className="flex mt-[-150px] items-center justify-center">
      <img src={imageUrl} className=" w-40 h-40 border" alt="image" />
    </div>
  );
};

export default ImageDisplay;
