
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import type { DateIdea } from "../types";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this context, we assume it's set in the environment.
  console.warn("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateDateIdeas = async (): Promise<DateIdea[]> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: "Generate 3 cute and creative date night ideas for a couple who love cozy and romantic activities. One idea should be for staying at home, one for going out, and one adventurous.",
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            title: {
                                type: Type.STRING,
                                description: 'The catchy name of the date idea.',
                            },
                            description: {
                                type: Type.STRING,
                                description: 'A short, sweet description of the date idea.',
                            },
                        },
                        required: ["title", "description"],
                    },
                },
            },
        });
        
        const jsonStr = response.text.trim();
        return JSON.parse(jsonStr);

    } catch (error) {
        console.error("Error generating date ideas:", error);
        return [
            { title: "Stargazing Picnic", description: "Pack a blanket and some snacks, find a quiet spot away from city lights, and spend the evening watching the stars together." },
            { title: "Memory Lane Movie Night", description: "Recreate your first date or watch the first movie you saw together at home with all your favorite treats." },
            { title: "Cooking Class", description: "Learn to make a new dish together. It's a fun way to collaborate and enjoy a delicious meal you made yourselves." },
        ];
    }
};