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
exports.MakePayment = void 0;
const stripe_1 = __importDefault(require("stripe"));

 
console.log("The stripe key: ", process.env.STRIPE_SECRET_KEY);
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
class MakePayment {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    execute(clientId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { amount, paymentType, } = data.formData;
            if (paymentType === "hourly") {
                const totalAmount = data.formData.estimateTime * data.formData.amount;
                console.log('The total: ', totalAmount);
                const product = yield stripe.products.create({
                    name: "Job-Post",
                });
                if (product) {
                    const price = yield stripe.prices.create({
                        product: `${product.id}`,
                        unit_amount: totalAmount * 100,
                        currency: "inr",
                    });
                    console.log("Final Data: ", data.formData);
                    if (price.id) {
                        var session = yield stripe.checkout.sessions.create({
                            line_items: [
                                {
                                    price: `${price.id}`,
                                    quantity: 1,
                                },
                            ],
                            mode: "payment",
                            success_url: `${process.env.FRONTEND_ORIGIN}/client/paymentSuccess/${encodeURIComponent(clientId)}/${encodeURIComponent(JSON.stringify(data.formData))}`,
                            cancel_url: `${process.env.FRONTEND_ORIGIN}/client/paymentFailed`,
                            customer_email: process.env.STRIPE_CUSTOMER_EMAIL,
                        });
                        return session;
                    }
                }
            }
            else {
                const totalAmount = amount;
                const product = yield stripe.products.create({
                    name: "Job-Post",
                });
                if (product) {
                    const price = yield stripe.prices.create({
                        product: `${product.id}`,
                        unit_amount: totalAmount * 100,
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
                            success_url: `${process.env.FRONTEND_ORIGIN}/client/paymentSuccess/${encodeURIComponent(clientId)}/${encodeURIComponent(JSON.stringify(data.formData))}`,
                            cancel_url: `${process.env.FRONTEND_ORIGIN}/client/paymentFailed`,
                            customer_email: process.env.STRIPE_CUSTOMER_EMAIL,
                        });
                        return session;
                    }
                }
            }
        });
    }
}
exports.MakePayment = MakePayment;
