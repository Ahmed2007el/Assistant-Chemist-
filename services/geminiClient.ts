
import { GoogleGenAI } from "@google/genai";

let genAIInstance: GoogleGenAI | null = null;

/**
 * Initializes the GoogleGenAI instance with the provided API key.
 * This function must be called before getGenAI is used.
 * @param apiKey - The user's Google AI API key.
 */
export const initializeGenAI = (apiKey: string) => {
    try {
        genAIInstance = new GoogleGenAI({ apiKey });
    } catch (error) {
        console.error("Failed to initialize GoogleGenAI:", error);
        genAIInstance = null;
        throw error;
    }
};

/**
 * Retrieves the singleton instance of the GoogleGenAI client.
 * Throws an error if the client has not been initialized.
 * @returns The initialized GoogleGenAI instance.
 */
export const getGenAI = (): GoogleGenAI => {
    if (!genAIInstance) {
        console.error("API key has not been set. Please initialize the client first.");
        throw new Error("API client is not initialized. An API key is required.");
    }
    return genAIInstance;
};
