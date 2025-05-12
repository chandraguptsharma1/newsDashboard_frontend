import React from "react";

export default function NewsCard({ article }) {
  const fallbackImage = "https://vitejs.dev/logo-with-shadow.png";

  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg transition flex flex-col h-full">
      <img
        src={article.image || fallbackImage}
        alt={article.title}
        className="w-full h-48 object-cover"
        onError={(e) => (e.target.src = fallbackImage)}
      />

      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-lg font-bold mb-1">{article.title}</h2>

        <p className="text-sm text-gray-600 mb-3 line-clamp-3">
          {article.description || "No description available."}
        </p>

        <div className="text-xs text-gray-400 mb-2">
          {article.publishedAt
            ? new Date(article.publishedAt).toDateString()
            : "Date not available"}{" "}
          • {article.source?.name || "Unknown"}
        </div>

        <button
          onClick={() => window.open(article.url, "_blank")}
          className="mt-auto bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded"
        >
          Read More →
        </button>
      </div>
    </div>
  );
}
