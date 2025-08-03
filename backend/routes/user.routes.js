import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { getUserProfile } from "../controllers/user.controller.js";

const router = express.Router();
router.get("/profile", isAuthenticated, getUserProfile);

export default router;
