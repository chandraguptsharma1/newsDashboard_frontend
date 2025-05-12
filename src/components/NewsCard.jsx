// src/components/NewsCard.jsx
import React from "react";

export default function NewsCard({ article }) {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg transition">
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-4 flex flex-col h-full">
        <h2 className="text-lg font-bold mb-1">{article.title}</h2>
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">
          {article.description}
        </p>

        <div className="text-xs text-gray-400 mb-2">
          {new Date(article.publishedAt).toDateString()} •{" "}
          {article.source?.name || "Unknown"}
        </div>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded"
        >
          Read More →
        </a>
      </div>
    </div>
  );
}
