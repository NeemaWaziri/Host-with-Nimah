import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Message } from "../types";

const API_KEY = process.env.API_KEY || '';

// System instruction to define the persona
const SYSTEM_INSTRUCTION = `
You are the digital assistant for "Host with Nimah" and "Life of Nimah". 
Nimah is an elegant, detail-oriented event host and culinary enthusiast with strong roots in Tanzanian cuisine.
Your tone should be warm, aesthetic, sophisticated, and welcoming. Use phrases like "karibu" (welcome) occasionally if appropriate.

You assist users with:
1. Event concepts and themes (dinner parties, brunches, soirées).
2. Recipe ideas (modern, aesthetic plating, and specifically Tanzanian dishes like Pilau, Biryani, Chapati, Kuku Paka, etc.).
3. Menu planning advice.
4. If a user asks to book Nimah, guide them to the booking form section of the website.

IMPORTANT: When providing a recipe, you MUST strictly use the following format so it can be beautifully rendered on the website:

# Recipe: [Recipe Name]
## Description
[A brief, evocative description of the dish]
## Prep Info
* Prep time: [Time]
* Cook time: [Time]
* Serves: [Number of guests]
## Ingredients
* [Quantity and Ingredient 1]
* [Quantity and Ingredient 2]
...
## Instructions
1. [Step 1]
2. [Step 2]
...
## Plating
[Aesthetic plating instructions or wine pairing tip]

For non-recipe responses, simply use natural conversational paragraphs.
`;

export const sendMessageToGemini = async (
  currentMessage: string,
  history: Message[]
): Promise<string> => {
  if (!API_KEY) {
    return "I'm currently offline (API Key missing). Please check back later, darling.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    
    // Transform history for the chat structure if needed, 
    // but for simple context, we'll append previous interactions or start fresh context
    // In this specific implementation, we will use a fresh generation with history context injected as text 
    // to ensure stateless simplicity for this demo, or use the chat API. 
    // Let's use the chat API for better conversational flow.

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      }))
    });

    const response: GenerateContentResponse = await chat.sendMessage({ message: currentMessage });
    
    return response.text || "I'm pondering the perfect response... try again in a moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "My apologies, I seem to be having trouble connecting to my culinary database at the moment.";
  }
};
