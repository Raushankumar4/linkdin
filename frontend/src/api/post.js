import api from "./axios";

export const fetchPosts = async () => {
  const res = await api.get("/posts");
  return res.data;
};

export const createPost = async ({ title, description }) => {
  const res = await api.post("/posts", { title, description });
  return res.data;
};

export const fetchUserPosts = async (userId) => {
  const res = await api.get(`/posts/user/${userId}`);
  return res.data;
};

export const updatePost = async ({ id, title, description }) => {
  const res = await api.put(`/posts/${id}`, { title, description });
  return res.data;
};

export const deletePost = async ({ id, token }) => {
  const res = await api.delete(`/posts/${id}`);
  return res.data;
};
