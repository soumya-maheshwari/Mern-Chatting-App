import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { searchUserThunk } from "../../redux/profileSlice";
import { ColorRing } from "react-loader-spinner";
import UserList from "./UserList";

const SearchUser = () => {
  const dispatch = useDispatch();

  const [searchResultArray, setSearchResultArray] = useState([]);
  const [loadingUser, setLoadingUser] = useState(false);
  const [search, setSearch] = useState("");
  const [onSearch, setOnSearch] = useState([]);

  const handleSearch = async (query) => {
    setSearch(query);
    // console.log(search);
    if (!query) {
      return;
    } else {
      try {
        setLoadingUser(true);
        dispatch(searchUserThunk(search))
          .then((res) => {
            console.log(res);
            setOnSearch(res.payload.data.user);

            if (res.payload.data.user.length > 0) {
              setLoadingUser(false);
            }
            return res;
          })
          .catch((err) => {
            console.log(err);
            return err.response;
          });
      } catch (error) {
        console.log(error);
        return error.response;
      }
    }
  };

  const handleUserSearch = () => {
    if (!search) {
      toast.error("Please enter user name to search");
      return;
    }
    dispatch(searchUserThunk(search))
      .then((res) => {
        console.log(res);
        setSearchResultArray(res.payload.data.user);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  };

  console.log(onSearch, "onSearch");

  return (
    <div>
      <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700">
        <i className="bi bi-search text-sm" onClick={handleUserSearch}></i>
        <input
          className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
          placeholder="Search user"
          value={search}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleUserSearch();
            }
          }}
        />
      </div>
      {loadingUser ? (
        <div className="loader-container w-[100%] mx-auto flex items-center justify-center">
          <ColorRing
            visible={true}
            height="50"
            width="50"
            ariaLabel="color-ring-loading"
            wrapperStyle={{
              display: "flex",
              alignItems: "center",
            }}
            wrapperClass="color-ring-wrapper"
            colors={["#c3c3df", "#8ca3c7", "#8282f7", "#c4c4de", "#d6d6df"]}
          />
        </div>
      ) : (
        <>
          <div
            className=" leading-7 p-2.5 mt-1 text-left items-center text-sm font-medium mt-2"
            id="sub-menu"
          >
            {onSearch?.slice(0, 4).map((user) => {
              return (
                <>
                  <UserList
                    userId={user._id}
                    username={user.username}
                    key={user._id}
                  />
                </>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchUser;
