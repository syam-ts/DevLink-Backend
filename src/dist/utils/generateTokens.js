"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
;
const generateTokens = (user) => {
    if (!user || !user._id) {
        throw new Error("User ID is missing in generateTokens");
    }
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
    const accessToken = jsonwebtoken_1.default.sign({ _id: user._id.toString(), role: user.role }, ACCESS_TOKEN_SECRET, { expiresIn: "1m" });
    const REFRESH_TOKEN_SECRET = process.env
        .REFRESH_TOKEN_SECRET;
    const refreshToken = jsonwebtoken_1.default.sign({ _id: user._id.toString(), role: user.role }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
    return { accessToken, refreshToken };
};
exports.default = generateTokens;
