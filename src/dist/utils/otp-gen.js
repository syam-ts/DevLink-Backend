"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_crypto_1 = require("node:crypto");
function generateOtp() {
    return (0, node_crypto_1.randomInt)(1000, 10000);
}
exports.default = generateOtp;
