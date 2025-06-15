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
exports.JobPostModel = exports.JobPostSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
;
exports.JobPostSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    keyResponsiblities: { type: [String], required: true },
    requiredSkills: { type: [String], required: true },
    estimateTime: { type: Number, required: false },
    estimateTimeinHours: { type: Number, required: false },
    paymentType: { type: String, required: false },
    amount: { type: Number, required: false },
    expertLevel: { type: String, required: false },
    location: { type: String, required: false },
    projectType: { type: String, required: false },
    maxProposals: { type: Number, required: false },
    proposalCount: { type: Number, required: false },
    aboutClient: { type: {}, required: false },
    status: { type: String, required: true },
    isPayment: { type: Boolean, required: true },
    createdAt: { type: Date, required: true },
    clientId: { type: mongoose_1.default.Schema.Types.ObjectId, required: true },
});
exports.JobPostModel = mongoose_1.default.model('JobPost', exports.JobPostSchema);
