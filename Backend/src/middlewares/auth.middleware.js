import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  // 1️⃣ Extract token from cookies or Authorization header
  const token =
    req.cookies?.accessToken ||
    (req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null);

  if (!token) {
    throw new ApiError(401, "Unauthorized request: Token missing");
  }

  let decodedToken;
  try {
    // 2️⃣ Verify token with secret from .env
    decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    throw new ApiError(401, "Invalid or expired token");
  }

  // 3️⃣ Find user in DB
  const user = await User.findById(decodedToken._id).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(401, "Unauthorized request: User not found");
  }

  // 4️⃣ Attach user to request
  req.user = user;

  // 5️⃣ Proceed to next middleware or route
  next();
});
