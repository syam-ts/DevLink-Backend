"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UserSchema = exports.jobPostSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.jobPostSchema = {
    _id: { type: String, required: false },
    title: { type: String, required: false },
    description: { type: String, required: false },
    expertLevel: { type: String, required: false },
    location: { type: String, required: false },
    amount: { type: Number, required: false },
    paymentType: { type: String, required: false, enums: ["hourly", "fixed"] },
    estimateTimeinHours: { type: Number, required: false },
    projectType: { type: String, required: false },
    requiredSkills: { type: [String], required: false },
};
//User Schema
exports.UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        index: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
    },
    age: {
        type: String,
        require: false,
    },
    password: {
        type: String,
        required: false,
    },
    mobile: { type: Number, required: false },
    profilePicture: { type: String, required: false },
    key: { type: String, required: false },
    location: { type: String, required: false },
    description: { type: String, required: false },
    skills: { type: [String], required: false },
    experience: { type: String, required: false },
    experienceDescription: { type: String, required: false },
    budget: { type: Number, required: false },
    rating: {
        ratingSum: { type: Number, default: 0, required: false },
        noOfRating: { type: Number, default: 0, required: false },
        avgRating: { type: Number, default: 0, required: false },
    },
    review: [
        {
            theReview: {
                type: String,
                required: false,
            },
            rating: {
                type: Number,
                required: false,
            },
            companyName: {
                type: String,
                required: false,
            },
        },
    ],
    totalJobs: { type: Number, required: false },
    totalHours: { type: Number, required: false },
    domain: { type: String, required: false },
    githubLink: { type: String, required: false },
    whyHireMe: { type: String, required: false },
    education: { type: [String], required: false },
    completedJobs: { type: Number, required: false },
    inProgress: { type: Number, required: false },
    workHistory: [{ type: exports.jobPostSchema, required: false }],
    request: [
        {
            type: { type: String, required: false },
            contractInfo: { type: mongoose_1.default.Schema.Types.Mixed, required: false },
            date: { type: Date, required: false },
        },
    ],
    wallet: {
        balance: { type: Number, required: false },
        transactions: [
            {
                type: Array,
            },
        ],
    },
    isBoosted: { type: Boolean, required: false },
    isBlocked: { type: Boolean, required: false },
    isEditRequest: { type: Boolean, required: false },
    isProfileFilled: { type: Boolean, required: false },
    createdAt: { type: Date, required: false },
});
exports.UserModel = mongoose_1.default.model("User", exports.UserSchema);
