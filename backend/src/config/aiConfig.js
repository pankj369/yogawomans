import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

// Ensure the API key exists
if (!process.env.OPENAI_API_KEY) {
  console.warn("WARNING: OPENAI_API_KEY is not defined in the environment.");
}

// Initialize the OpenAI Client
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
