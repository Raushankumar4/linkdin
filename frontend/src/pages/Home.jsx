import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPosts, createPost } from "../api/post";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const { token } = useAuth();
  const [userInput, setUserInput] = useState({ title: "", description: "" });
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const postMutation = useMutation({
    mutationFn: (data) => createPost({ ...data, token }),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      setUserInput({ title: "", description: "" });
      toast.success("Post created!");
      setShowForm(false);
    },
    onError: () => {
      toast.error("Failed to create post");
    },
  });

  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description } = userInput;
    if (title.trim() && description.trim()) {
      postMutation.mutate(userInput);
    } else {
      toast.error("Please fill in both fields");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Public Feed</h2>

      {token && (
        <div className="flex justify-end mb-4">
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 border border-red-200 px-4 py-2 rounded-md hover:bg-red-50 transition"
          >
            Logout
          </button>
        </div>
      )}

      {token && (
        <div className="mb-8">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="w-full bg-white border border-gray-300 px-5 py-3 rounded-lg shadow-sm text-left hover:bg-gray-50 text-gray-500 transition"
            >
              What's on your mind?
            </button>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl shadow-lg p-6 space-y-4 border border-gray-100"
            >
              <input
                name="title"
                placeholder="Title"
                value={userInput.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                name="description"
                placeholder="Say something..."
                value={userInput.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-sm text-gray-500 hover:underline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={postMutation.isLoading}
                  className={`px-4 py-2 rounded-md text-white font-medium transition duration-200 ${postMutation.isLoading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                  {postMutation.isLoading ? "Posting..." : "Post"}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {isLoading ? (
        <p className="text-center text-gray-500 animate-pulse">Loading posts...</p>
      ) : (
        <div className="space-y-6">
          {posts?.map((post) => (
            <div
              key={post?._id}
              className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Link to={`/profile/${post?.createdBy?._id}`}>
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post?.createdBy?.name}`}
                      alt="profile"
                      className="w-10 h-10 rounded-full border"
                    />
                  </Link>
                  <Link
                    to={`/profile/${post?.createdBy?._id}`}
                    className="text-sm font-medium text-blue-600 hover:underline"
                  >
                    {post?.createdBy?.name}
                  </Link>
                </div>
                <p className="text-xs text-gray-500">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{post?.title}</h3>
              <p className="text-gray-700 mt-2">{post?.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
