import React, { useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { loginUserThunk } from "../redux/authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleShowHide = () => {
    setShow(!show);
  };

  const data = {
    username,
    password,
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Fill all the fields ");
      return;
    }
    setLoading(true);
    dispatch(loginUserThunk(data))
      .then((res) => {
        console.log(res);
        // setLoading(res.payload.data.isLoading);
        if (res.payload.data.success) {
          toast.success(`${res.payload.data.msg}`);
          setLoading(false);

          localStorage.setItem("userInfo", JSON.stringify(res.payload.data));

          setusername("");
          setPassword("");

          setTimeout(() => {
            navigate("/home");
          }, 2000);
        } else {
          setLoading(false);
          toast.error(`${res.payload.data.msg}`);
        }
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
  return (
    <div className="bg-backgroundColor min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg w-[90%] sm:w-[60%] md:w-[50%] max-w-md text-black">
        <h2 className="text-2xl text-center mb-6 font-bold">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">username:</label>
            <input
              type="username"
              id="username"
              className="mt-1 p-2 w-full rounded-md border border-gray-300 bg-white"
              required
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
          </div>

          <div className="mb-4 relative">
            <label className="block text-sm font-medium">Password:</label>
            <input
              type={show ? "text" : "password"}
              id="password"
              className="mt-1 p-2 w-full rounded-md border border-gray-300 bg-white"
              // required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {show ? (
              <FontAwesomeIcon
                icon={faEye}
                className="eye-icon absolute top-1/2  right-2  cursor-pointer"
                onClick={handleShowHide}
              />
            ) : (
              <FontAwesomeIcon
                icon={faEyeSlash}
                onClick={handleShowHide}
                className="eye-icon absolute top-1/2  right-2 cursor-pointer"
              />
            )}
          </div>
          <div className="text-center">
            New User?{" "}
            <NavLink
              to="/signup"
              className="font-bold hover:text-primary hover:underline"
            >
              Register
            </NavLink>
          </div>
          <div className="submit mt-8">
            <div className="text-center">
              {loading ? (
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
                    colors={[
                      "#131324",
                      "#1b64d8",
                      "#1010b0",
                      "#131324",
                      "#020217",
                    ]}
                  />
                </div>
              ) : (
                <button className="btn w-full bg-primary hover:bg-backgroundColor text-black hover:text-primary hover:text-white hover:border-2 border-2  text-center shadow-gray-300 shadow-md hover:shadow-2xl p-2 rounded-md cursor-pointer">
                  GO
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
