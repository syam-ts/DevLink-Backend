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
exports.VerifyEmail = void 0;
// import { User } from "../../../domain/entities/User";
const nodemailer_1 = __importDefault(require("nodemailer"));
const otp_gen_1 = __importDefault(require("../../../utils/otp-gen"));
const sendMail = (toMail, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: "Gmail",
            auth: {
                user: "syamnandhu3@gmail.com",
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });
        //generates new otp's
        const otp = (0, otp_gen_1.default)();
        const info = yield transporter.sendMail({
            from: "syamnandhu3@gmail.com",
            to: toMail,
            subject: "Verified Email for password changing",
            text: `https://dev-link-frontend.vercel.app/resetPassword/${userId}?role=user`,
        });
    }
    catch (error) {
        console.error("Error sending email:", error);
    }
});
class VerifyEmail {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUser = yield this.userRepository.findUserByEmail(email);
            if (!foundUser) {
                throw new Error("User not founded");
            }
            sendMail(foundUser.email, foundUser._id);
            return foundUser._id;
        });
    }
}
exports.VerifyEmail = VerifyEmail;
