import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { accessChatThunk } from "../../redux/chatSlice";

const UserList = (props) => {
  const dispatch = useDispatch();

  const handleAccessChat = () => {
    const userId = props.profile_id;
    dispatch(accessChatThunk({ userId }))
      .then((res) => {
        console.log(userId);
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  };
  return (
    <div onClick={handleAccessChat}>
      <h1 className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1 w-full text-[18px]">
        {props.username}
      </h1>
      <br />
    </div>
  );
};

export default UserList;
