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
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const node_path_1 = __importDefault(require("node:path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: node_path_1.default.resolve(__dirname, '.env')
});
const groq = new groq_sdk_1.default({
    apiKey: process.env.GROQ_API_KEY
});
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
                    role: "user",
                    content: input,
                },
            ],
            model: "llama3-8b-8192",
        });
    });
}
;
