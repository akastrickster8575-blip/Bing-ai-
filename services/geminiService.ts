
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzePhoto = async (base64Image: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          parts: [
            { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
            { text: "Analyze this image for quality and content. Confirm its validity. Provide professional, encouraging feedback in Fluent English. Every valid upload earns ₹2.00. Return JSON with 'reward' (fixed at 2) and 'feedback' (e.g., 'Excellent composition! Your contribution has been verified and ₹2.00 is credited to your wallet.')." }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reward: { type: Type.NUMBER },
            feedback: { type: Type.STRING }
          },
          required: ["reward", "feedback"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error analyzing photo:", error);
    return { reward: 2, feedback: "Photo successfully received. Your wallet has been credited with ₹2.00." };
  }
};

export const generateDataCode = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are Bing AI, a professional network assistant. A user requires a data voucher code. User Prompt: ${prompt}. Generate a unique 12-digit alphanumeric code prefixed with 'BING-'. Specify a data allocation (e.g., 1GB, 5GB). Return as JSON with 'code' and 'dataAmount'.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            code: { type: Type.STRING },
            dataAmount: { type: Type.STRING }
          },
          required: ["code", "dataAmount"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error generating code:", error);
    return { code: `BING-${Math.random().toString(36).toUpperCase().substring(2, 10)}`, dataAmount: "1GB" };
  }
};
