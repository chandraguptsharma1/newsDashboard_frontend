import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";

export default function LoginScreen() {
  const [form, setForm] = useState({
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
      [name]: value.trimStart(),
    }));

    validateField(name, value.trim());
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

  const handleLogin = async () => {
    if (Object.keys(error).length === 0 && form.email && form.password) {
      try {
        // Show loading popup
        Swal.fire({
          title: "Logging in...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const res = await axios.post(
          "https://ecommerce-backend-6i0q.onrender.com/api/auth/login",
          {
            email: form.email,
            password: form.password,
          }
        );

        const user = res.data.data.user;
        setUser(user);

        // Close loading
        Swal.close();

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome, ${form.email}!`,
          confirmButtonColor: "#3085d6",
        }).then(() => {
          navigate("/news");
        });
      } catch (err) {
        Swal.close(); // Close loading if error occurs
        console.error("Login failed:", err);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text:
            err?.response?.data?.message ||
            err?.message ||
            "Something went wrong!",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Validation Failed",
        text: "Please fix the errors before continuing.",
      });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">Login</h1>

              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs">
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

                  <button
                    onClick={handleLogin}
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
                    <span className="ml-3">Login</span>
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
