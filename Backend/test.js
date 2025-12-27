import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

console.log("🔍 GROQ_API_KEY exists:", !!process.env.GROQ_API_KEY);

try {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
  
  console.log("✅ Groq initialized");
  
  const message = await groq.chat.completions.create({
    messages: [{ role: "user", content: "Hello" }],
    model: "llama-3.3-70b-versatile",  // ✅ Updated model
    max_tokens: 100,
  });
  
  console.log("✅ API call successful!");
  console.log("Response:", message.choices[0].message.content);
} catch (error) {
  console.error("❌ Error:", error.message);
}