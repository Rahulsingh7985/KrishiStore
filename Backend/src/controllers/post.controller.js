import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Post } from "../models/post.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { getGroqResponse } from "../utils/gemini.js";

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
// 🤖 AI Suggest Post (ALL CATEGORIES)
// ----------------------------------------
// const aiSuggestPost = asyncHandler(async (req, res) => {
//   const { problem } = req.body;

//   // Validate input
//   if (!problem || problem.trim() === "") {
//     throw new ApiError(400, "Problem/title is required");
//   }

//   // 1️⃣ Fetch all published posts
//   const posts = await Post.find(
//     { isPublished: true },
//     "title category description price"
//   );

//   if (posts.length === 0) {
//     throw new ApiError(404, "No products found in database");
//   }

//   // 2️⃣ Prepare product list for AI
//   const productList = posts
//     .map((p, i) => `${i + 1}. ${p.title} (Category: ${p.category}, Price: ₹${p.price})`)
//     .join("\n");

//   // 3️⃣ Create strict prompt to prevent hallucination
//   const prompt = `You are a helpful assistant that suggests products from a list.

// User's problem/need:
// "${problem}"

// Available products:
// ${productList}

// Instructions:
// 1. Suggest ONLY ONE product from the list above
// 2. Choose the most suitable product for the user's problem
// 3. If no product matches, reply: "No suitable product found"
// 4. Reply with ONLY the product title, nothing else
// 5. Do NOT suggest products not in the list
// 6. Do NOT make up products`;

//   // 4️⃣ Call Groq API (Free, fast, reliable)
//   const aiReply = await getGroqResponse(prompt);

//   // 5️⃣ Find the suggested product (optional)
//   const suggestedProductTitle = aiReply.trim();
//   const suggestedProduct = posts.find(
//     (p) => p.title.toLowerCase() === suggestedProductTitle.toLowerCase()
//   );

//   return res.status(200).json(
//     new ApiResponse(
//       200,
//       {
//         suggestion: suggestedProductTitle,
//         product: suggestedProduct || null,
//       },
//       "AI suggestion generated successfully"
//     )
//   );
// });

const aiSuggestPost = asyncHandler(async (req, res) => {
  const { problem } = req.body;

  // 1️⃣ Validate input
  if (!problem || problem.trim() === "") {
    throw new ApiError(400, "Problem/title is required");
  }

  // 2️⃣ Fetch all published products
  const posts = await Post.find(
    { isPublished: true },
    "title category description price"
  );

  if (!posts || posts.length === 0) {
    throw new ApiError(404, "No products found in database");
  }

  // 3️⃣ Prepare product list with INDEX (important)
  const productList = posts
    .map(
      (p, i) =>
        `${i + 1}. ${p.title} | Category: ${p.category} | Price: ₹${p.price}`
    )
    .join("\n");

  // 4️⃣ AI prompt for BEST matching product
  const suggestionPrompt = `
User problem: "${problem}"

Available products:
${productList}

Rules:
- Select the SINGLE BEST product that matches the user's problem
- Reply with ONLY the product NUMBER (example: 1 or 2)
- Do NOT include product name or explanation
`;

  // 5️⃣ Get AI response
  const aiReply = await getGroqResponse(suggestionPrompt);

  // 6️⃣ Extract product index safely
  const selectedIndex = parseInt(aiReply.match(/\d+/)?.[0], 10);

  if (!selectedIndex || !posts[selectedIndex - 1]) {
    throw new ApiError(404, "AI could not find a suitable product");
  }

  const suggestedProduct = posts[selectedIndex - 1];

  // 7️⃣ Get AI explanation for selected product
  const infoPrompt = `
Product: ${suggestedProduct.title}
Category: ${suggestedProduct.category}
Description: ${suggestedProduct.description}

User problem: "${problem}"

Provide EXACTLY 4 lines in this format:
BENEFITS: [2-3 key benefits]
USAGE: [how to use it]
DOSAGE: [recommended quantity]
REASON: [why this product solves the problem]
`;

  const infoResponse = await getGroqResponse(infoPrompt);

  // 8️⃣ Parse AI response
  const aiInfo = {
    benefits: "",
    usage: "",
    dosage: "",
    reason: "",
  };

  infoResponse
    .split("\n")
    .map((line) => line.trim())
    .forEach((line) => {
      if (line.startsWith("BENEFITS:")) {
        aiInfo.benefits = line.replace("BENEFITS:", "").trim();
      } else if (line.startsWith("USAGE:")) {
        aiInfo.usage = line.replace("USAGE:", "").trim();
      } else if (line.startsWith("DOSAGE:")) {
        aiInfo.dosage = line.replace("DOSAGE:", "").trim();
      } else if (line.startsWith("REASON:")) {
        aiInfo.reason = line.replace("REASON:", "").trim();
      }
    });

  // 9️⃣ Final response
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        suggestion: suggestedProduct.title,
        aiInfo,
        product: suggestedProduct,
      },
      "AI suggestion generated successfully"
    )
  );
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
  aiSuggestPost,
};
