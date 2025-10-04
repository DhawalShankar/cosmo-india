import { useState, useEffect } from "react";

export default function Posts({ darkMode }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const res = await fetch(
          "https://docs.google.com/document/d/1TePVBMqTDCCwm9bO8f7AMvhoYU_sSUnGVMKzlweBZL0/export?format=txt"
        );
        const text = await res.text();

        // Robust parsing: handles extra spaces, blank lines, and spacing changes
        const regex = /Author:\s*(.*?)\s*Content:\s*([\s\S]*?)(?=Author:|$)/gi;
        const matches = [...text.matchAll(regex)];

        const parsedPosts = matches
  .map((m) => ({
    author: m[1].trim(),
    content: m[2].replace(/\s+/g, " ").trim(),
  }))
  .filter((post) => post.author && post.content); // all posts now


        setPosts(parsedPosts);
      } catch (err) {
        console.error("Error fetching Google Doc:", err);
      }
    };

    fetchDoc();
    const interval = setInterval(fetchDoc, 60000); // refresh every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {posts.map((post, idx) => (
        <div
          key={idx}
          className={`rounded-2xl shadow-md p-6 transition-colors duration-300 ${
            darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
          }`}
        >
          <h3 className="text-lg font-semibold mb-2">{post.author}</h3>
          <p className="text-sm leading-relaxed whitespace-pre-line">{post.content}</p>
        </div>
      ))}
    </div>
  );
}
