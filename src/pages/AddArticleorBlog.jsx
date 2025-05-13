import React, { useState } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../utils/axiosInstance";

export default function AddArticleorBlog() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    url: "",
    image: "",
    publishedAt: "",
    sourceName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formatted = {
      title: form.title,
      description: form.description,
      url: form.url,
      image: form.image,
      publishedAt: form.publishedAt,
      source: { name: form.sourceName },
    };

    handleAddArticle(formatted); // Send the article object to parent or API
  };

  const handleAddArticle = async (article) => {
    // Show loading spinner
    Swal.fire({
      title: "Saving article...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await axiosInstance.post("/news/save-article", article);

      console.log("article save", response);

      if (response?.data.status == 200) {
        // Close loader and show success
        Swal.fire({
          icon: "success",
          title: "Article saved!",
          text: "Your article was saved successfully.",
        });
      }
    } catch (err) {
      // Close loader and show error
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: err?.response?.data?.message || "Something went wrong.",
      });
      console.error("Error saving article:", err);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('https://i.ibb.co/kg3j87KW/backgroundimage.jpg')",
      }}
      className="p-5 min-h-screen flex justify-center items-center bg-no-repeat bg-cover bg-center"
    >
      <div className="py-8 px-6 max-w-xl w-full bg-white bg-opacity-30 rounded-lg shadow-lg backdrop-blur-xl backdrop-filter">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-5">
          Add New Article
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="bg-transparent border rounded-lg shadow border-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="3"
              required
              className="bg-transparent border rounded-lg shadow border-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              URL
            </label>
            <input
              type="url"
              name="url"
              value={form.url}
              onChange={handleChange}
              required
              className="bg-transparent border rounded-lg shadow border-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              value={form.image}
              onChange={handleChange}
              className="bg-transparent border rounded-lg shadow border-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Published At
            </label>
            <input
              type="datetime-local"
              name="publishedAt"
              value={form.publishedAt}
              onChange={handleChange}
              required
              className="bg-transparent border rounded-lg shadow border-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Source Name
            </label>
            <input
              type="text"
              name="sourceName"
              value={form.sourceName}
              onChange={handleChange}
              required
              className="bg-transparent border rounded-lg shadow border-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full"
            />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-purple-400 to-indigo-500 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out w-full"
          >
            Submit Article
          </button>
        </form>
      </div>
    </div>
  );
}
