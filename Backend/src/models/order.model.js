import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post", // product model name
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          default: 1
        }
      }
    ],

    // 👉 Customer WhatsApp message
    whatsappMessage: {
      type: String,
      required: true,
      trim: true
    },

    totalAmount: {
      type: Number,
      required: true
    },

    orderStatus: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending"
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending"
    },

    address: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
