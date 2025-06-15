import Grog from "groq-sdk";
import path from 'node:path';
import dotenv from "dotenv";
dotenv.config({
  path: path.resolve(__dirname, '.env')
});

const groq = new Grog({
  apiKey: process.env.GROQ_API_KEY as string
});


export class ChatBot {
  constructor(private userRepositary: UserRepositary) { }

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
    model: "llama3-8b-8192",
  });
};
  
export interface UserRepositary {
  // chatInput(input: string): Promise< any >
}