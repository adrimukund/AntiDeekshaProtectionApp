import { GoogleGenAI, Type } from "@google/genai";
import { DefenseAnalysis } from "../types";

const SYSTEM_INSTRUCTION = `
You are the AI core of the "Anti Deeksha Protection Service". 
Deeksha is a fictional character representing a playful, overly affectionate, or slightly chaotic person who puts the user in tricky social situations.

Your goal is to provide a FUNNY, WITTY, and OBSERVATIONAL tactical analysis. 
CONTEXT: Use "Indian/Desi" style humor. Think relatable struggles like saving money, fearing strict parents, avoiding commitment, and engineering student logic.
Avoid being too dramatic or mean. Keep it chill, sarcastic, and fun.
Use slang like "Bhai", "Scene sorted", "Jugad", "Kat gaya" naturally.

Return the response in JSON format.
`;

export const analyzeThreat = async (userInput: string): Promise<DefenseAnalysis> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key is missing");
    }

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Current Threat Report: ${userInput}`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3-5 short, funny keywords (e.g. 'WALLET KHATRA', 'MUMMY CALLING', 'RUN')",
            },
            threat_analysis: {
              type: Type.STRING,
              description: "A funny, relatable breakdown of what is happening. Use Indian context.",
            },
            defense_strategy: {
              type: Type.STRING,
              description: "The primary tactical advice (e.g., mention UPI failure, stomach ache, strict dad).",
            },
            verbal_counter: {
              type: Type.STRING,
              description: "A witty, sarcastic line the user should say back.",
            },
            survival_probability_text: {
              type: Type.STRING,
              description: "A one-liner predicting the outcome.",
            },
          },
          required: ["tags", "threat_analysis", "defense_strategy", "verbal_counter", "survival_probability_text"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text) as DefenseAnalysis;

  } catch (error) {
    console.error("Gemini Error:", error);
    // Fallback in case of error
    return {
      tags: ["SERVER DOWN", "CHAI BREAK", "ERROR"],
      threat_analysis: "System is on a chai break. Too much pressure.",
      defense_strategy: "Just smile and wave.",
      verbal_counter: "Network issue hai.",
      survival_probability_text: "Bhagwan jaane.",
    };
  }
};