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
exports.SignupUser = void 0;
const send_mail_1 = require("../../../utils/send-mail");
class SignupUser {
    constructor(userRepositary) {
        this.userRepositary = userRepositary;
    }
    execute(user) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('The whole user includes Email: ', user);
            const existingUser = yield this.userRepositary.signupUser(user.email);
            if (existingUser) {
                throw new Error("User already exists");
            }
            else {
                console.log('Reachded here before');
                const otp = yield (0, send_mail_1.sendMail)(user.email);
                console.log('The email', user.email);
                return otp;
            }
        });
    }
}
exports.SignupUser = SignupUser;
