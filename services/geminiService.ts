import { GoogleGenAI, Type } from "@google/genai";
import { DefenseAnalysis } from "../types";

const SYSTEM_INSTRUCTION = `
You are the AI core of the "Anti Deeksha Protection Service". 
Deeksha is a fictional character representing a playful, overly affectionate, or slightly annoying person who puts the user in "dangerous" social situations.

Your goal is to provide a HILARIOUS, SARCASSTIC, and DRAMATIC tactical analysis of the situation. 
CONTEXT: Use "Indian/Desi" style humor. Think Bollywood melodrama, strict Indian parents logic, engineering student struggles, and over-the-top reactions. 
Use slang like "Bhai", "Scene sorted", "Kat gaya", "Didi", etc. appropriately.
Keep it light-hearted and funny, not mean.

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
              description: "3-5 short, punchy keywords (e.g. 'BHABHI ZONE', 'KAT GAYA', 'GHAR JAO')",
            },
            threat_analysis: {
              type: Type.STRING,
              description: "A funny, dramatic breakdown of what is happening. Use Indian context.",
            },
            defense_strategy: {
              type: Type.STRING,
              description: "The primary tactical advice to survive the encounter (e.g., mention Rakhi, calling mom, pretending to be broke).",
            },
            verbal_counter: {
              type: Type.STRING,
              description: "A witty, sarcastic line the user should say back to Deeksha.",
            },
            survival_probability_text: {
              type: Type.STRING,
              description: "A paragraph predicting the outcome if they fail.",
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
      tags: ["SERVER DOWN", "ABORT", "ERROR"],
      threat_analysis: "System overloaded by too much drama. Servers have gone to Himalayas for sannyas.",
      defense_strategy: "Switch off phone and sleep.",
      verbal_counter: "Main fakeer hoon.",
      survival_probability_text: "Bhagwan bharose.",
    };
  }
};