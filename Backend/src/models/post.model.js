import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    image: {
      type: String,   // Cloudinary URL, local path, etc.
      required: true
    },

    category: {
      type: String,
      enum: [
        "seed",
        "pesticide",
        "fertilizer",
        "equipment",
        "herbicide",

      ],
      required: true
    },

    price: {
      type: Number,
      required: false  // if product → use this, if blog → ignore
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",           // admin user id
      required: true
    },

    isPublished: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
