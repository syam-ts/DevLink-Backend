"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateTokens_1 = __importDefault(require("../../../../utils/generateTokens"));
;
const refreshToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        res.status(401).json({ message: "No refresh token" });
        return;
    }
    jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err || !decoded) {
            res.status(403).json({ message: "Invalid or expired refresh token" });
            return;
        }
        const { accessToken } = (0, generateTokens_1.default)(decoded);
        res.json({ accessToken });
    });
};
exports.default = refreshToken;
