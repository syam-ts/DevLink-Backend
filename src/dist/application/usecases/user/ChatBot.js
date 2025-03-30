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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatBot = void 0;
const { GoogleGenerativeAI } = require("@google/generative-ai");
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
class ChatBot {
    constructor(userRepositary) {
        this.userRepositary = userRepositary;
    }
    execute(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chatSession = model.startChat({
                    generationConfig,
                    history: [
                        { role: "user", parts: [{ text: "hi\n" }] },
                        { role: "model", parts: [{ text: "Hi there! How can I help you today?\n" }] },
                    ],
                });
                const result = yield chatSession.sendMessage(userInput);
                return result.response.text();
            }
            catch (error) {
                console.error("Chatbot API Error:", error);
                return "Sorry, I'm currently unavailable. Please try again later!";
            }
        });
    }
}
exports.ChatBot = ChatBot;
