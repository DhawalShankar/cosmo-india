import { useState, useEffect } from "react";
import { Heart, MessageCircle, Send, User } from "lucide-react";

export default function Posts({ darkMode }) {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [showComments, setShowComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [userName, setUserName] = useState("");
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [userLiked, setUserLiked] = useState({});

  // Get or create user ID
  useEffect(() => {
    let userId = localStorage.getItem("cosmo_user_id");
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("cosmo_user_id", userId);
    }

    // Load user's liked posts from localStorage
    const likedPosts = JSON.parse(localStorage.getItem("cosmo_liked_posts") || "{}");
    setUserLiked(likedPosts);

    // Load saved username
    const savedName = localStorage.getItem("cosmo_user_name");
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const res = await fetch(
          "https://docs.google.com/document/d/1TePVBMqTDCCwm9bO8f7AMvhoYU_sSUnGVMKzlweBZL0/export?format=txt"
        );
        const text = await res.text();

        const regex = /Author:\s*(.*?)\s*Content:\s*([\s\S]*?)(?=Author:|$)/gi;
        const matches = [...text.matchAll(regex)];

        const parsedPosts = matches
          .map((m) => ({
            author: m[1].trim(),
            content: m[2].trim(),
          }))
          .filter((post) => post.author && post.content);

        setPosts(parsedPosts);

        // TODO: Fetch likes and comments from backend
        // fetchPostInteractions(parsedPosts);
      } catch (err) {
        console.error("Error fetching Google Doc:", err);
      }
    };

    fetchDoc();
    const interval = setInterval(fetchDoc, 60000);
    return () => clearInterval(interval);
  }, []);

  // TODO: Backend Integration Functions
  const fetchPostInteractions = async (posts) => {
    // When backend is ready:
    // const response = await fetch('/api/posts/interactions');
    // const data = await response.json();
    // setLikes(data.likes);
    // setComments(data.comments);
  };

  const handleLike = (idx) => {
    // Check if user already liked this post
    if (userLiked[idx]) {
      alert("You have already liked this post!");
      return;
    }

    const userId = localStorage.getItem("cosmo_user_id");

    // Update local state
    setLikes((prev) => ({
      ...prev,
      [idx]: (prev[idx] || 0) + 1,
    }));

    // Mark as liked by this user
    const updatedLikes = { ...userLiked, [idx]: true };
    setUserLiked(updatedLikes);
    localStorage.setItem("cosmo_liked_posts", JSON.stringify(updatedLikes));

    // TODO: Send to backend
    /*
    fetch('/api/posts/like', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        postId: posts[idx].id || idx,
        userId: userId,
        postAuthor: posts[idx].author,
        postContent: posts[idx].content
      })
    });
    */
  };

  const handleCommentClick = (idx) => {
    if (!userName) {
      setShowNamePrompt(true);
      setPendingAction({ type: "comment", postIdx: idx });
      return;
    }
    toggleComments(idx);
  };

  const handleCommentSubmit = (idx) => {
    if (!userName) {
      setShowNamePrompt(true);
      setPendingAction({ type: "submitComment", postIdx: idx });
      return;
    }

    const commentText = newComment[idx]?.trim();
    if (!commentText) {
      alert("Please enter a comment!");
      return;
    }

    if (commentText.length > 500) {
      alert("Comment is too long! Maximum 500 characters.");
      return;
    }

    const userId = localStorage.getItem("cosmo_user_id");
    const timestamp = new Date().toISOString();

    const commentData = {
      text: commentText,
      userName: userName,
      userId: userId,
      timestamp: timestamp,
    };

    setComments((prev) => ({
      ...prev,
      [idx]: [...(prev[idx] || []), commentData],
    }));

    setNewComment((prev) => ({
      ...prev,
      [idx]: "",
    }));

    // TODO: Send to backend
    /*
    fetch('/api/posts/comment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        postId: posts[idx].id || idx,
        userId: userId,
        userName: userName,
        comment: commentText,
        postAuthor: posts[idx].author,
        postContent: posts[idx].content,
        timestamp: timestamp
      })
    });
    */
  };

  const toggleComments = (idx) => {
    setShowComments((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleNameSubmit = () => {
    const trimmedName = userName.trim();
    
    if (!trimmedName) {
      alert("Please enter your name!");
      return;
    }

    if (trimmedName.length < 2) {
      alert("Name must be at least 2 characters!");
      return;
    }

    if (trimmedName.length > 50) {
      alert("Name is too long! Maximum 50 characters.");
      return;
    }

    // Validate name (only letters, spaces, and basic punctuation)
    if (!/^[a-zA-Z\s\-'.]+$/.test(trimmedName)) {
      alert("Please enter a valid name (letters only)!");
      return;
    }

    localStorage.setItem("cosmo_user_name", trimmedName);
    setShowNamePrompt(false);

    // Execute pending action
    if (pendingAction) {
      if (pendingAction.type === "comment") {
        toggleComments(pendingAction.postIdx);
      } else if (pendingAction.type === "submitComment") {
        handleCommentSubmit(pendingAction.postIdx);
      }
      setPendingAction(null);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // seconds

    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <>
      {/* Name Prompt Modal */}
      {showNamePrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div
            className={`max-w-md w-full mx-4 p-8 rounded-2xl shadow-2xl ${
              darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <User className="w-6 h-6 text-red-600" />
              <h3 className="text-2xl font-bold">Enter Your Name</h3>
            </div>
            <p className={`mb-6 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Please provide your name to interact with posts
            </p>
            <input
              type="text"
              placeholder="Your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleNameSubmit();
              }}
              maxLength={50}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500 mb-4 ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-gray-200"
                  : "bg-white border-gray-300 text-gray-800"
              }`}
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowNamePrompt(false);
                  setPendingAction(null);
                  setUserName("");
                }}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                  darkMode
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleNameSubmit}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {posts.length === 0 ? (
          <div className="col-span-3 text-center py-12">
            <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
              Loading posts...
            </p>
          </div>
        ) : (
          posts.map((post, idx) => (
            <div
              key={idx}
              className={`rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${
                darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
              }`}
            >
              {/* Post Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-red-600">
                  {post.author}
                </h3>
                <p className="text-sm leading-relaxed whitespace-pre-line mb-4">
                  {post.content}
                </p>

                {/* Like & Comment Buttons */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => handleLike(idx)}
                    disabled={userLiked[idx]}
                    className={`flex items-center gap-2 transition-all duration-300 ${
                      userLiked[idx]
                        ? "text-red-600 cursor-not-allowed"
                        : darkMode
                        ? "text-gray-400 hover:text-red-500 hover:scale-110"
                        : "text-gray-600 hover:text-red-600 hover:scale-110"
                    }`}
                    title={userLiked[idx] ? "You already liked this" : "Like this post"}
                  >
                    <Heart
                      className={`w-5 h-5 ${userLiked[idx] ? "fill-red-600" : ""}`}
                    />
                    <span className="text-sm font-medium">{likes[idx] || 0}</span>
                  </button>

                  <button
                    onClick={() => handleCommentClick(idx)}
                    className={`flex items-center gap-2 transition-all duration-300 hover:scale-110 ${
                      darkMode
                        ? "text-gray-400 hover:text-blue-400"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      {comments[idx]?.length || 0}
                    </span>
                  </button>
                </div>
              </div>

              {/* Comments Section */}
              {showComments[idx] && (
                <div
                  className={`p-4 border-t ${
                    darkMode
                      ? "bg-gray-900 border-gray-700"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  {/* Existing Comments */}
                  <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                    {comments[idx]?.length > 0 ? (
                      comments[idx].map((comment, cIdx) => (
                        <div
                          key={cIdx}
                          className={`p-3 rounded-lg ${
                            darkMode ? "bg-gray-800" : "bg-white"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-semibold text-red-600">
                              {comment.userName}
                            </span>
                            <span
                              className={`text-xs ${
                                darkMode ? "text-gray-500" : "text-gray-400"
                              }`}
                            >
                              {formatTimestamp(comment.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm">{comment.text}</p>
                        </div>
                      ))
                    ) : (
                      <p
                        className={`text-sm text-center py-4 ${
                          darkMode ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        No comments yet. Be the first!
                      </p>
                    )}
                  </div>

                  {/* Add Comment */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder={
                        userName
                          ? "Add a comment..."
                          : "Enter your name first..."
                      }
                      value={newComment[idx] || ""}
                      onChange={(e) =>
                        setNewComment((prev) => ({
                          ...prev,
                          [idx]: e.target.value,
                        }))
                      }
                      onKeyPress={(e) => {
                        if (e.key === "Enter") handleCommentSubmit(idx);
                      }}
                      maxLength={500}
                      className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${
                        darkMode
                          ? "bg-gray-800 border-gray-700 text-gray-200"
                          : "bg-white border-gray-300 text-gray-800"
                      }`}
                    />
                    <button
                      onClick={() => handleCommentSubmit(idx)}
                      disabled={!newComment[idx]?.trim()}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        newComment[idx]?.trim()
                          ? "bg-red-600 text-white hover:bg-red-700"
                          : darkMode
                          ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                          : "bg-gray-300 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  {newComment[idx] && (
                    <p
                      className={`text-xs mt-1 text-right ${
                        darkMode ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      {newComment[idx].length}/500
                    </p>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}