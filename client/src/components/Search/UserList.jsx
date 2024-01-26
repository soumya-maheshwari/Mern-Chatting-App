import React from "react";
import photo from "../../assets/profile.png";
import { useDispatch, useSelector } from "react-redux";
import {
  accessChatThunk,
  allChatsThunk,
  setSelectedChat,
} from "../../redux/chatSlice";
import toast from "react-hot-toast";

const UserList = (props) => {
  const dispatch = useDispatch();

  const handleAccessChat = () => {
    const userId = props.userId;
    console.log(userId);
    dispatch(accessChatThunk({ userId }))
      .then((res) => {
        console.log(res);
        if (res.payload.data.success) {
          toast.success(`${res.payload.data.msg}`);
          dispatch(
            setSelectedChat(res.payload.data.FullChat._id) ||
              res.payload.data.isChat[0]._id
          );

          dispatch(allChatsThunk());
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
    <div
      onClick={handleAccessChat}
      className="flex gap-3 mb-3 p-2  mt-2 hover:bg-gray-700  rounded-md "
    >
      <img
        src={props.photo || photo}
        className="rounded-full  w-10 h-10 border-white border border-white border-10 cursor-pointer"
        alt=""
      />
      <h1 className="cursor-pointer p-1  rounded-md mt-1 w-full text-[16px]">
        {props.username}
      </h1>
      <br />
    </div>
  );
};

export default UserList;
