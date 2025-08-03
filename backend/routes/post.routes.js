import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
  createPost,
  deletePost,
  getAllPosts,
  getUserPosts,
  updatePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/", isAuthenticated, createPost);
router.get("/", isAuthenticated, getAllPosts);
router.get("/user/:userId", isAuthenticated, getUserPosts);
router.put("/:id", isAuthenticated, updatePost);
router.delete("/:id", isAuthenticated, deletePost);

export default router;
