"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatBot = void 0;
const { GoogleGenerativeAI } = require("@google/generative-ai");
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const groq = new groq_sdk_1.default({
    apiKey: process.env.GROQ_API_KEY
});
console.log('Api: ', process.env.GROQ_API_KEY);
class ChatBot {
    constructor(userRepositary) {
        this.userRepositary = userRepositary;
    }
    execute(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const chatComletion = yield getResult(userInput);
                const data = (_b = (_a = chatComletion.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content;
                console.log('The chat result: ', data);
                return data;
            }
            catch (error) {
                console.error("Chatbot API Error:", error);
                return error;
            }
        });
    }
}
exports.ChatBot = ChatBot;
function getResult(input) {
    return __awaiter(this, void 0, void 0, function* () {
        return groq.chat.completions.create({
            messages: [
                {
                    role: 'user',
                    content: input
                }
            ],
            model: "llama3-8b-8192"
        });
    });
}
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
// export class ChatBot {
//   constructor(private userRepositary: UserRepositary) { }
//   async execute(userInput: string) {
//     try {
//       const chatSession = model.startChat({
//         generationConfig,
//         history: [
//           { role: "user", parts: [{ text: "hi\n" }] },
//           { role: "model", parts: [{ text: "Hi there! How can I help you today?\n" }] },
//         ],
//       });
//       const result = await chatSession.sendMessage(userInput);
//       return result.response.text();
//     } catch (error) {
//       console.error("Chatbot API Error:", error);
//       return "Sorry, I'm currently unavailable. Please try again later!";
//     }
//   }
// }
