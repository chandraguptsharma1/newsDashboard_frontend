import axiosInstance from "../utils/axiosInstance";

export const fetchNews = async (query = "") => {
  try {
    const response = await axiosInstance.post("/news/get-article", {});
    const articles = response.data?.data || [];

    // Only include articles that have BOTH title and description
    const validArticles = articles.filter(
      (article) => article?.title && article?.description
    );

    // Frontend filtering using query string
    const filtered = validArticles.filter((article) =>
      `${article.title} ${article.description}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );

    return filtered;
  } catch (err) {
    console.error("Error fetching the news from backend:", err);
    return [];
  }
};
