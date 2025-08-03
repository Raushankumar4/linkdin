import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchUserPosts } from "../api/post";

const UserProfile = () => {
  const { userId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userPosts", userId],
    queryFn: () => fetchUserPosts(userId),
    enabled: !!userId,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 animate-pulse">Loading user profile...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500 font-semibold">Failed to load user profile.</p>
      </div>
    );
  }

  const posts = data;
  const user = posts[0]?.createdBy;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-10 border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
          {user?.name}'s Profile
        </h2>
        <div className="space-y-2 text-center">
          <p className="text-gray-700">
            <span className="font-medium text-gray-600">Email:</span> {user?.email}
          </p>
          <p className="text-gray-700">
            <span className="font-medium text-gray-600">Bio:</span>{" "}
            {user?.bio || <span className="italic text-gray-400">No bio provided.</span>}
          </p>
        </div>
      </div>

      {/* Posts */}
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Posts</h3>

      {posts.length === 0 ? (
        <p className="text-gray-500 text-center italic">No posts yet.</p>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                <p className="text-xs text-gray-500">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>
              <h4 className="text-xl font-semibold text-gray-900">{post.title}</h4>
              <p className="text-gray-700 mt-2">{post.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
