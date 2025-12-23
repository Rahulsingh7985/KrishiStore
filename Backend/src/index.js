import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config();

let isConnected = false;

async function initDB() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
    console.log("✅ MongoDB connected");
  }
}

initDB();

export default app;
