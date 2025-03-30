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
exports.WithdrawMoneyByUser = void 0;
class WithdrawMoneyByUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(userId, amount, accountNumber, balance, type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!amount || !accountNumber)
                throw new Error("Please fill all fields");
            if (amount > balance || amount <= 0)
                throw new Error("Amount need to valid");
            if (accountNumber.toString().length > 14 ||
                accountNumber.toString().length < 14)
                throw new Error("Account number should be minimum 14 numbers");
            const result = yield this.userRepository.withdrawMoney(userId, amount, accountNumber, type);
            return result;
        });
    }
}
exports.WithdrawMoneyByUser = WithdrawMoneyByUser;
