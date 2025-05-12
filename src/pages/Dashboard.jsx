import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import { useNews } from "../hooks/useNews";
import NewsCard from "../components/NewsCard";

export default function NewsDashboard() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("technology");

  const [debouncedQuery] = useDebounce(query, 500);
  const { news, loading } = useNews(`${debouncedQuery} ${category}`);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-center">
        📰 News - {category.charAt(0).toUpperCase() + category.slice(1)}
      </h1>
      <p className="text-center text-gray-500 mb-6">
        Explore the latest articles based on your interest
      </p>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search for news..."
          className="border p-2 rounded-md flex-1"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select
          className="border p-2 rounded-md w-full md:w-48"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="technology">Technology</option>
          <option value="sports">Sports</option>
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
        </select>
      </div>

      {/* Loader & Content */}
      {loading ? (
        <div className="text-center text-lg font-semibold text-gray-600">
          Loading news...
        </div>
      ) : news.length === 0 ? (
        <div className="text-center text-red-500">No articles found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
