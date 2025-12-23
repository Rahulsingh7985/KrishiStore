import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();

// Set allowed origin for Vercel deployment
const allowedOrigin =
  process.env.CORS_ORIGIN;

// CORS setup using env variable
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parsing
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes import
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";

// Routes declaration
app.use("/api/v2/users", userRouter);
app.use("/api/v2/posts", postRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Default route for testing
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// ✅ Default export for Vercel
export default app;
