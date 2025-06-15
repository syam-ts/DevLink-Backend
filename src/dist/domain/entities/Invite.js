"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const InviteSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.default.Types.ObjectId, required: true },
    clientId: { type: mongoose_1.default.Types.ObjectId, required: true },
    description: { type: String, required: true },
    jobPostData: {
        _id: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        expertLevel: { type: String, required: false },
        location: { type: String, required: false },
        requiredSkills: { type: [String], required: true },
        amount: { type: Number, required: false },
        paymentType: { type: String, required: false },
        estimateTimeinHours: { type: Number, required: false },
        projectType: { type: String, required: false },
    },
    clientData: {
        companyName: { type: String, required: true },
        email: { type: String, required: true },
        location: { type: String, required: false },
    },
    status: { type: String, required: true, default: "pending" },
    createdAt: { type: Date, required: true },
});
exports.InviteModel = mongoose_1.default.model("Invite", InviteSchema);
