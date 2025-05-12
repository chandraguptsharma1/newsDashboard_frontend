// src/api/newsApi.js
import mockData from "../mock/mockNews.json";

export const fetchNews = async (query = "") => {
  const articles = mockData.articles;

  // Filter based on query string
  const filtered = articles.filter((a) =>
    `${a.title} ${a.description}`.toLowerCase().includes(query.toLowerCase())
  );

  // Simulate delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(filtered), 300);
  });
};
