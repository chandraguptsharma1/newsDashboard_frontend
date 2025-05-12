import React, { useState } from "react";
import Swal from "sweetalert2";

import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { saveUserToDB } from "../utils/db";
import axiosInstance from "../utils/axiosInstance";

export default function Registration() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };

  const validateField = (field, value) => {
    const errors = { ...error };

    if (field === "email") {
      if (!value.trim()) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        errors.email = "Email is invalid";
      } else {
        delete errors.email;
      }
    }

    if (field === "password") {
      if (!value.trim()) {
        errors.password = "Password is required";
      } else if (value.length < 6) {
        errors.password = "Password must be at least 6 characters";
      } else {
        delete errors.password;
      }
    }

    setError(errors);
  };

  const handleRegistration = async () => {
    if (
      Object.keys(error).length === 0 &&
      form.name &&
      form.email &&
      form.password
    ) {
      try {
        Swal.fire({
          title: "Registering...",
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading(),
        });

        const res = await axiosInstance.post("/auth/register", {
          name: form.name,
          email: form.email,
          password: form.password,
        });

        const user = res.data.data.user;
        console.log("User from API:", user);
        await saveUserToDB({ ...user, password: form.password });

        setUser(user);
        Swal.close();

        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: `Welcome, ${form.email}`,
        }).then(() => {
          navigate("/login");
        });
      } catch (err) {
        Swal.close();
        console.error(
          "Registration error:",
          err?.message || err.response?.data
        );
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text:
            err?.response?.data?.message ||
            JSON.stringify(err?.response?.data) ||
            "Something went wrong!",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Validation Failed",
        text: "Please fix the errors before registering.",
      });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">
                Registration
              </h1>

              <div className="w-full flex-1 mt-8">
                {/* Email Field */}
                <div className="mx-auto max-w-xs">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full px-8 py-4 mb-4 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  />
                  {error.name && (
                    <p className="text-red-500 text-xs mt-1">{error.name}</p>
                  )}

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full px-8 py-4 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  />
                  {error.email && (
                    <p className="text-red-500 text-xs mt-1">{error.email}</p>
                  )}

                  {/* Password Field */}
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full px-8 py-4 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm mt-5 focus:outline-none focus:border-gray-400 focus:bg-white"
                  />
                  {error.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {error.password}
                    </p>
                  )}

                  {/* Login Button */}
                  <button
                    onClick={handleRegistration}
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span className="ml-3">Register</span>
                  </button>

                  <p className="mt-6 text-xs text-gray-600 text-center">
                    I agree to abide by templatana's{" "}
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Terms of Service
                    </a>{" "}
                    and its{" "}
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Illustration */}
          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "url('https://www.kdrsoft.com/services-images/45-blog-and-news-website-designing.webp')",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
