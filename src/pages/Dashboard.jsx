import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import { useNews } from "../hooks/useNews";
import NewsCard from "../components/NewsCard";
import Loader from "../components/Loader"; // if using spinner

export default function NewsDashboard() {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query.trim(), 500);

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
