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
exports.VerifyEmailClient = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const otp_gen_1 = __importDefault(require("../../../utils/otp-gen"));
const sendMail = (toMail, clientId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: 'Gmail',
            auth: {
                user: 'syamnandhu3@gmail.com',
                pass: process.env.GMAIL_APP_PASSWORD
            }
        });
        //generates new otp's
        const otp = (0, otp_gen_1.default)();
        const info = yield transporter.sendMail({
            from: 'syamnandhu3@gmail.com',
            to: toMail,
            subject: 'Verified Email for password changing',
            //   text: `https://dev-link-frontend.vercel.app/resetPassword/${clientId}?role=client`,
            text: `${process.env.FRONTEND_ORIGIN}/resetPassword/${clientId}?role=client`,
        });
    }
    catch (error) {
        console.error('Error sending email:', error);
    }
});
class VerifyEmailClient {
    constructor(clientRepositary) {
        this.clientRepositary = clientRepositary;
    }
    execute(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundClient = yield this.clientRepositary.findClientByEmail(email);
            if (!foundClient) {
                throw new Error('client not founded');
            }
            sendMail(foundClient.email, foundClient._id);
            return foundClient._id;
        });
    }
}
exports.VerifyEmailClient = VerifyEmailClient;
