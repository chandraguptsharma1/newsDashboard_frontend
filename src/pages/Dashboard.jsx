import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import { useNews } from "../hooks/useNews";
import NewsCard from "../components/NewsCard";
import Loader from "../components/Loader";
import AddArticleorBlog from "./AddArticleorBlog";
import axiosInstance from "../utils/axiosInstance";
import Swal from "sweetalert2";

export default function NewsDashboard() {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query.trim(), 500);

  const [showModal, setShowModal] = useState(false);

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

        setShowModal(false);
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

  const { news, loading } = useNews(debouncedQuery);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-center">📰 News Dashboard</h1>
      <p className="text-center text-gray-500 mb-6">
        Explore the latest curated articles
      </p>

      {/* Search Input */}
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search articles by title or description..."
          className="border p-2 rounded-md w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="text-end">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 rounded p-2 text-white"
        >
          Add News/Blog
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <AddArticleorBlog onSubmit={handleAddArticle} />
          </div>
        </div>
      )}

      {/* Loader & Content */}
      {loading ? (
        <Loader />
      ) : news.length === 0 ? (
        <div className="text-center text-red-500">No articles found.</div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4 text-center">
            Showing {news.length} article{news.length !== 1 ? "s" : ""}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
