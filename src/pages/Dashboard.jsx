import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useNews } from "../hooks/useNews";
import NewsCard from "../components/NewsCard";
import Loader from "../components/Loader";
import AddArticleorBlog from "./AddArticleorBlog";
import axiosInstance from "../utils/axiosInstance";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function NewsDashboard() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query.trim(), 500);
  const [showModal, setShowModal] = useState(false);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackImage = "https://i.ibb.co/DPpfV1zj/news-sample.jpg";

  // Fetch API
  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/news/get-article", {});
      const articles = response.data?.data || [];

      const validArticles = articles.filter(
        (article) => article?.title && article?.description
      );

      const filtered = validArticles.filter((article) =>
        `${article.title} ${article.description}`
          .toLowerCase()
          .includes(debouncedQuery.toLowerCase())
      );

      setNews(filtered);
    } catch (err) {
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [debouncedQuery]);

  // Data partitioning
  const feature = news[0];
  const sideStories = news.slice(1, 6);
  const trending = news.slice(6);

  return (
    // <div className="p-6 max-w-7xl mx-auto">

    /* Search Input
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search articles by title or description..."
          className="border p-2 rounded-md w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div> */

    /* <div className="text-end">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 rounded p-2 text-white"
        >
          Add News/Blog
        </button>
      </div> */

    // {showModal && (
    //   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    //     <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
    //       <button
    //         className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold"
    //         onClick={() => setShowModal(false)}
    //       >
    //         &times;
    //       </button>
    //       <AddArticleorBlog onSubmit={handleAddArticle} />
    //     </div>
    //   </div>
    // )}

    // {loading ? (
    //   <Loader />
    // ) : news.length === 0 ? (
    //   <div className="text-center text-red-500">No articles found.</div>
    // ) : (
    //   <>
    //     <p className="text-sm text-gray-500 mb-4 text-center">
    //       Showing {news.length} article{news.length !== 1 ? "s" : ""}
    //     </p>
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //       {news.map((article, index) => (
    //         <NewsCard key={index} article={article} />
    //       ))}
    //     </div>
    //   </>
    // )}
    // </div>
    <>
      <div className="max-w-7xl mx-auto p-4 space-y-10">
        {loading ? (
          <Loader />
        ) : news.length === 0 ? (
          <div className="text-center text-red-500">No articles found.</div>
        ) : (
          <>
            {/* Top Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Feature Story */}
              {feature && (
                <div className="lg:col-span-2">
                  <img
                    src={
                      feature.image ||
                      "https://i.ibb.co/DPpfV1zj/news-sample.jpg"
                    }
                    alt={feature.title}
                    className="rounded-xl w-full h-80 object-cover"
                  />
                  <h2 className="text-2xl font-semibold mt-4">
                    {feature.title}
                  </h2>
                  <p className="text-gray-600 mt-2">{feature.description}</p>
                </div>
              )}

              {/* Side Stories */}
              <div className="flex flex-col space-y-4 pr-2">
                {sideStories.map((article, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <img
                      src={
                        article.image ||
                        "https://i.ibb.co/DPpfV1zj/news-sample.jpg"
                      }
                      className="w-24 h-20 object-cover rounded-lg"
                      alt={article.title}
                    />
                    <div>
                      <h3 className="font-semibold text-sm ">
                        {article.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {article.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">12 min ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending News */}
            {trending.length > 0 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Trending News</h2>
                  {/* <button className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                    See More →
                  </button> */}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trending.map((article, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl shadow hover:shadow-md p-4"
                    >
                      <img
                        src={
                          article.image ||
                          "https://i.ibb.co/DPpfV1zj/news-sample.jpg"
                        }
                        className="rounded-lg h-40 w-full object-cover mb-3"
                        alt={article.title}
                      />
                      <h3 className="text-base font-bold">{article.title}</h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {article.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        10 minutes ago
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
