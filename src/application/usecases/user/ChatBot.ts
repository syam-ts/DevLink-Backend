import Grog from "groq-sdk";
import path from "node:path";
import dotenv from "dotenv";
dotenv.config({
  path: path.resolve(__dirname, '../../../.env')
});
 
console.log('THE NEW API KEY FOR GROQ TEST: ', process.env.GROQ_API_KEY);

const groq = new Grog({
  apiKey: process.env.GROQ_API_KEY as string,
});

export class ChatBot {
  async execute(userInput: string) {
    try {
      const chatComletion = await getResult(userInput);

      const data = chatComletion.choices[0]?.message?.content;

      return data;
    } catch (error) {
      console.error("Chatbot API Error:", error);
      return error;
    }
  }
}

async function getResult(input: string) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: input,
      },
    ],
    model: "llama-3.1-8b-instant",
  });
}
