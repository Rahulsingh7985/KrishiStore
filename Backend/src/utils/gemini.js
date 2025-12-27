import Groq from "groq-sdk";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Validate API key at startup
if (!process.env.GROQ_API_KEY) {
  console.error("❌ GROQ_API_KEY is not set in .env file");
  throw new Error("GROQ_API_KEY environment variable is not set");
}

console.log("✅ Groq API Key Loaded Successfully");

// Initialize Groq client with explicit configuration
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * Get response from Groq API (Free tier - up to 1000 requests/day)
 * @param {string} prompt - The prompt to send to Groq
 * @returns {Promise<string>} - The generated response text
 */
export const getGroqResponse = async (prompt) => {
  // Validate input
  if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
    throw new Error("Prompt must be a non-empty string");
  }

  try {
    console.log("📤 Sending request to Groq API...");
    
    const message = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile", // Fast, reliable, free model
      max_tokens: 512,
      temperature: 0.7,
    });

    // Validate response
    if (!message?.choices?.[0]?.message?.content) {
      throw new Error("Invalid response from Groq API");
    }

    const response = message.choices[0].message.content;
    console.log("✅ Groq response received successfully");
    
    return response;
  } catch (error) {
    console.error("❌ Groq API Error:", error.message);
    
    // Handle specific error types
    if (error.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }
    if (error.status === 401) {
      throw new Error("Invalid API key. Please check your GROQ_API_KEY.");
    }
    
    throw new Error(`Failed to get Groq response: ${error.message}`);
  }
};

/**
 * Alias for backwards compatibility
 */
export const getGeminiResponse = getGroqResponse;