
import { GoogleGenAI } from "@google/genai";

export const getPriceTrendAnalysis = async (productName: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze the typical price trend for ${productName} in local Indian kirana stores over the last 6 months. Provide a concise summary of whether it is a good time to buy.`,
  });
  return response.text;
};

export const generateProductImage = async (productDescription: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: `A high-quality, professional product photograph of ${productDescription}. The product is placed on a clean wooden kitchen counter in a warm, welcoming Indian home setting. Soft sunlight, studio lighting, bokeh background. No text, no logos.`,
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

export const getChatResponse = async (query: string, history: { role: 'user' | 'model', text: string }[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: 'You are KiranaConnect AI Assistant. You help users find local grocery stores, compare prices, and understand seasonal grocery trends in India. Emphasize that we connect directly to neighborhood families, not cold dark stores.'
    },
    history: history.map(h => ({
      role: h.role,
      parts: [{ text: h.text }]
    }))
  });
  
  const response = await chat.sendMessage({ message: query });
  return response.text;
};
