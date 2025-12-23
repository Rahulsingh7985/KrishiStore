import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Post } from "../models/post.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";

// ----------------------------------------
// 🟢 Create a new Post (ADMIN ONLY)
// ----------------------------------------
const createPost = asyncHandler(async (req, res) => {
  const { title, description, price, category } = req.body;

  // Validation
  if ([title, description].some((f) => !f || f.trim() === "")) {
    throw new ApiError(400, "Title and Description are required");
  }

  // Image required (memoryStorage → buffer)
  if (!req.file?.buffer) {
    throw new ApiError(400, "Image is required");
  }

  // Upload image to Cloudinary (buffer-based)
  const imageUpload = await uploadOnCloudinary(req.file.buffer, "posts");

  if (!imageUpload?.secure_url) {
    throw new ApiError(500, "Failed to upload image");
  }

  // Create post
  const post = await Post.create({
    title,
    description,
    image: imageUpload.secure_url,
    category,
    price: price || 0,
    createdBy: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, post, "Post created successfully"));
});

// ----------------------------------------
// 🟢 Get All Published Posts
// ----------------------------------------
const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ isPublished: true })
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, posts, "All posts fetched"));
});

// ----------------------------------------
// 🟢 Get Single Post
// ----------------------------------------
const getSinglePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid Post ID");
  }

  const post = await Post.findById(id);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post fetched successfully"));
});

// ----------------------------------------
// 🟢 Update Post (ADMIN ONLY)
// ----------------------------------------
const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, category, price } = req.body;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid Post ID");
  }

  const post = await Post.findById(id);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  // Only admin who created the post
  if (post.createdBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not authorized to update this post");
  }

  let imageUrl = post.image;

  // If new image uploaded
  if (req.file?.buffer) {
    const upload = await uploadOnCloudinary(req.file.buffer, "posts");

    if (!upload?.secure_url) {
      throw new ApiError(500, "Failed to upload new image");
    }

    imageUrl = upload.secure_url;
  }

  post.title = title || post.title;
  post.description = description || post.description;
  post.category = category || post.category;
  post.price = price ?? post.price;
  post.image = imageUrl;

  await post.save();

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post updated successfully"));
});

// ----------------------------------------
// 🟢 Delete Post (ADMIN ONLY)
// ----------------------------------------
const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid Post ID");
  }

  const post = await Post.findById(id);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  // Only admin who created the post
  if (post.createdBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not authorized to delete this post");
  }

  await Post.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Post deleted successfully"));
});

// ----------------------------------------
// Export Controllers
// ----------------------------------------
export {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
};
