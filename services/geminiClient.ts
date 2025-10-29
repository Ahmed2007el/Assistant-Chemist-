
import { GoogleGenAI } from "@google/genai";

let genAIInstance: GoogleGenAI | null = null;

export const getGenAI = (): GoogleGenAI => {
    if (!genAIInstance) {
        // As per guidelines, the API key must come from the environment variable.
        // We assume `process.env.API_KEY` is configured and available.
        if (!process.env.API_KEY) {
            console.error("API key is missing. Please ensure the API_KEY environment variable is set.");
            throw new Error("API key is not configured.");
        }
        genAIInstance = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return genAIInstance;
};
