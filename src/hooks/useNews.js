import { useEffect, useState } from "react";
import { fetchNews } from "../api/newsApi";

export const useNews = (query) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchNews(query)
      .then((articles) => setNews(articles))
      .finally(() => setLoading(false));
  }, [query]);

  return { news, loading };
};
