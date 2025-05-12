import React, { useState } from "react";

export default function AddArticleorBlog({ onSubmit }) {
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

    onSubmit(formatted); // Send the article object to parent or API
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center mb-6">Add New Article</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-medium mb-1">URL</label>
          <input
            type="url"
            name="url"
            value={form.url}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Image URL</label>
          <input
            type="url"
            name="image"
            value={form.image}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Published At</label>
          <input
            type="datetime-local"
            name="publishedAt"
            value={form.publishedAt}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Source Name</label>
          <input
            type="text"
            name="sourceName"
            value={form.sourceName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Article
        </button>
      </form>
    </div>
  );
}
