import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
  aiSuggestPost,
} from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// ----------------------------
// Public Routes
// ----------------------------
router.route("/").get(getAllPosts);  
router.route("/ai-suggest").post(aiSuggestPost);         // Get all published posts
router.route("/:id").get(getSinglePost);      // Get single post by ID

// ----------------------------
// Secured Routes (ADMIN ONLY)
// ----------------------------
// ----------------------------
// 🤖 AI Suggestion Route (Public)
// ----------------------------

router.route("/create").post(verifyJWT, upload.single("image"), createPost);  // Create post
router.route("/update/:id").patch(verifyJWT, upload.single("image"), updatePost); // Update post
router.route("/delete/:id").delete(verifyJWT, deletePost);                     // Delete post

export default router;
