import React, { useEffect, useState } from "react";
import {
  FiMenu,
  FiSearch,
  FiUser,
  FiPlusCircle,
  FiLogIn,
  FiUserPlus,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../Auth/AuthContext";

function NavBar() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/add-article");
  };

  const handleLogo = () => {
    navigate("/");
  };

  useEffect(() => {
    if (token) {
      console.log("token===>", token);
      setisLoggedIn(true);
    } else {
      setisLoggedIn(false);
    }
  }, []);

  const handleSignin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/register");
  };

  const token = localStorage.getItem("token");

  // const { user, setUser, loading } = useAuth();
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   localStorage.removeItem("user");
  //   setUser(null);
  //   navigate("/login");
  // };
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* HEADER */}
      <header className="flex items-center justify-between px-4 py-2 border-b shadow-sm bg-white relative">
        {/* LEFT: Mobile - Menu Icon | Desktop - Search */}
        <div className="flex items-center space-x-2">
          {/* Mobile: Menu */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-xl block md:hidden"
          >
            <FiMenu />
          </button>

          {/* Desktop: Search + Input */}
          <div className="hidden md:flex items-center space-x-2">
            <FiSearch className="text-xl" />
            <input
              type="text"
              placeholder="Search articles..."
              className="border border-gray-300 px-3 py-1 rounded-md text-sm w-64"
            />
          </div>
        </div>

        {/* CENTER: Title */}
        <div
          onClick={handleLogo}
          className="absolute left-1/2 transform -translate-x-1/2 text-lg font-bold"
        >
          Bloomberg
        </div>

        {/* RIGHT: Auth Buttons (desktop only) */}
        <div className="hidden md:flex items-center space-x-2">
          {isLoggedIn ? (
            <>
              <button
                onClick={handleClick}
                className="flex items-center gap-2 px-4 py-1 text-sm bg-gray-700 text-white rounded hover:bg-gray-800 transition"
              >
                <FiPlusCircle /> News/Blog
              </button>
              <div className="w-8 h-8 rounded-full bg-gray-100 border flex items-center justify-center text-black hover:shadow-md transition">
                <FiUser />
              </div>
            </>
          ) : (
            <>
              <button
                onClick={handleSignin}
                className="flex items-center gap-2 px-4 py-1 text-sm border border-black rounded hover:bg-gray-100 transition"
              >
                <FiLogIn /> Sign In
              </button>
              <button
                onClick={handleSignup}
                className="flex items-center gap-2 px-4 py-1 text-sm bg-black text-white rounded hover:opacity-90 transition"
              >
                <FiUserPlus /> Sign Up
              </button>
            </>
          )}
        </div>
      </header>

      {/* SIDEBAR (Mobile) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-xl text-red-500 font-bold"
          >
            ✖
          </button>
        </div>
        <div className="flex flex-col space-y-4 px-6 mt-10">
          {isLoggedIn ? (
            <>
              <button
                onClick={handleClick}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-700 text-white rounded hover:bg-gray-800 text-left transition"
              >
                <FiPlusCircle /> News/Blog
              </button>
              <div className="flex items-center gap-3 px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-800">
                <FiUser className="text-xl bg-white p-1 rounded-full border w-8 h-8" />{" "}
                Profile
              </div>
            </>
          ) : (
            <>
              <button
                onClick={handleSignin}
                className="flex items-center gap-2 px-4 py-2 text-sm border border-black rounded hover:bg-gray-100 text-left transition"
              >
                <FiLogIn /> Sign In
              </button>
              <button
                onClick={handleSignup}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-black text-white rounded hover:opacity-90 text-left transition"
              >
                <FiUserPlus /> Sign Up
              </button>
            </>
          )}
        </div>
      </div>

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
}

export default NavBar;
