
import { GoogleGenAI } from "@google/genai";

export const generatePhilosophy = async (baseSlogan: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = 'gemini-3-flash-preview';
    
    const response = await ai.models.generateContent({
      model,
      contents: `Based on the slogan "${baseSlogan}", generate a short, abstract, and poetic philosophical statement (max 30 words) about nodes and emerging forms. Tone: Minimalist, futuristic.`,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Gemini generation failed:", error);
    return "Where data converges, structure silently manifests from the abstract noise.";
  }
};
