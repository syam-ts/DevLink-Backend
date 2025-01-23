const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = "AIzaSyDnkeEFUwQsG9-dG2J4c2tCP3Ji5Zmw22c";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
 

   

export interface UserRepositary {
  // chatInput(input: string): Promise< any >
} 



export class ChatBot {
  constructor(private userRepositary: UserRepositary) {}

  async execute( userInput: string ) {   

    const ChatBot: any = async () => {
      const chatSession = model.startChat({
        generationConfig,
        history: [
          {
            role: "user",
            parts: [
              {text: "hi\n"},
            ],
          },
          {
            role: "model",
            parts: [
              {text: "Hi there! How can I help you today?\n"},
            ],
          },
        ],
      });
    
      const result = await chatSession.sendMessage(userInput);
      // console.log(result.response.text());
  
      return result.response.text()
    }
    
   const result = await ChatBot();

         return result;
  }
}