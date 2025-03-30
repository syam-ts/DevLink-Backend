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
exports.BoostPayment = void 0;
const stripe_1 = __importDefault(require("stripe")); 
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
class BoostPayment {
    constructor(userRepositary) {
        this.userRepositary = userRepositary;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield stripe.products.create({
                name: "Boost-User",
            });
            let boostPrice = 400;
            if (product) {
                const price = yield stripe.prices.create({
                    product: `${product.id}`,
                    unit_amount: boostPrice * 100,
                    currency: "inr",
                });
                if (price.id) {
                    var session = yield stripe.checkout.sessions.create({
                        line_items: [
                            {
                                price: `${price.id}`,
                                quantity: 1,
                            },
                        ],
                        mode: "payment",
                        success_url: `http://localhost:5173/user/profileBoostSuccess`,
                        cancel_url: "http://localhost:5173/user/payment-failed",
                        customer_email: "samplemail@gmai.com",
                    });
                    return session;
                }
            }
        });
    }
}
exports.BoostPayment = BoostPayment;
