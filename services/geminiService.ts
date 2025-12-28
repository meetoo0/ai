
import { GoogleGenAI, Modality } from "@google/genai";

export async function generateSpeech(text: string, voice: string, emotion: string): Promise<string | undefined> {
  // Do not create GoogleGenAI instance when component is first rendered
  // to avoid race condition of API key selection.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = emotion ? `Say ${emotion}: ${text}` : text;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return base64Audio;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate speech: ${error.message}`);
    }
    throw new Error('An unknown error occurred while generating speech.');
  }
}
