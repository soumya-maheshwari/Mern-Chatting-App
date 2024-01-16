import React, { useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Signup = () => {
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleShowHide = () => {
    setShow(!show);
  };

  const handleSubmit = () => {};
  return (
    <div className="bg-backgroundColor min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg w-[90%] sm:w-[60%] md:w-[50%] max-w-md text-black">
        <h2 className="text-2xl text-center mb-6 font-bold">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email:</label>
            <input
              type="userName"
              id="userName"
              className="mt-1 p-2 w-full rounded-md border border-gray-300 bg-white"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Username:</label>
            <input
              type="userName"
              id="userName"
              className="mt-1 p-2 w-full rounded-md border border-gray-300 bg-white"
              required
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
            />
          </div>

          <div className="mb-4 relative">
            <label className="block text-sm font-medium">Password:</label>
            <input
              type={show ? "text" : "password"}
              id="userName"
              className="mt-1 p-2 w-full rounded-md border border-gray-300 bg-white"
              required
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
            Have an account?{" "}
            <NavLink
              to="/signup"
              className="font-bold hover:text-primary hover:underline"
            >
              Login
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
                <div className="btn bg-primary hover:bg-backgroundColor text-black hover:text-primary hover:text-white hover:border-2 border-2  text-center shadow-gray-300 shadow-md hover:shadow-2xl p-2 rounded-md cursor-pointer">
                  GO
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
