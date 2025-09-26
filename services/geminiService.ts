
import { GoogleGenAI } from "@google/genai";

// Ensure API_KEY is available in the environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
  // In a real app, you might want to handle this more gracefully.
  // For this simulator, we'll log an error and allow the app to continue,
  // but the AI feature will fail.
  console.error("Gemini API key not found in environment variables.");
}

// Initialize Gemini AI only if the key exists
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateLyrics = async (topic: string): Promise<string> => {
  if (!ai) {
    return "AI service is unavailable. Please check your API key configuration.";
  }
  
  if (!topic.trim()) {
    return "Please provide a topic for the lyrics.";
  }

  try {
    const prompt = `You are a rap lyric generator. Write a creative and clean 8-line verse about "${topic}". The verse should have a good rhythm and rhyme scheme.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating lyrics with Gemini API:", error);
    if (error instanceof Error) {
        return `An error occurred while generating lyrics: ${error.message}`;
    }
    return "An unknown error occurred while generating lyrics.";
  }
};
