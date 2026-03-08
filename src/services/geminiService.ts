import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateToolResponse(model: string, prompt: string, isImage: boolean = false) {
  if (isImage) {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: [{ parts: [{ text: prompt }] }],
    });
    
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return { type: 'image', data: `data:image/png;base64,${part.inlineData.data}` };
      }
    }
    return { type: 'text', data: response.text };
  } else {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return { type: 'text', data: response.text };
  }
}
