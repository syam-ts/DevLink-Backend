import mongoose from "mongoose";

interface Jobs {
  _id: string;
  title: string;
  description: string;
  expertLevel: string;
  location: string;
  amount: number;
  paymentType: string;
  estimateTimeinHours: string;
  projectType: string;
  requiredSkills: [string];
}

const jobPostSchema = {
  _id: { type: String, required: false },
  title: { type: String, required: false },
  description: { type: String, required: false },
  expertLevel: { type: String, required: false },
  location: { type: String, required: false },
  amount: { type: Number, required: false },
  paymentType: { type: String, required: false },
  estimateTimeinHours: { type: String, required: false },
  projectType: { type: String, required: false },
  requiredSkills: { type: [String], required: false },
};

export interface User extends mongoose.Document {
  name: string;
  age?: number;
  password?: string;
  mobile?: number;
  email: string;
  profilePicture?: string;
  description?: string;
  location?: string;
  skills?: [string];
  experience: string;
  budget: number;
  rating: {
    ratingSum: number;
    noOfRating: number;
    avgRating: number;
  };
  review: [
    {
      theReview: string;
      rating: number;
      companyName: string;
    }
  ];
  totalJobs: number;
  totalHours: number;
  domain: string;
  whyHireMe: string;
  githubLink: string;
  education: [string];
  completedJobs: number;
  inProgress: number;
  workHistory: [Jobs];
  isEditRequest: boolean;
  request: [
    {
      type: string;
      contractInfo: mongoose.Schema.Types.Mixed;
      created: Date;
    }
  ];
  wallet: {
    balance: { type: Number; required: false };
    transactions: [
      {
        type: [];
      }
    ];
  };
  isBlocked: boolean;
  isBoosted: boolean;
  isProfileFilled: boolean;
  createdAt: Date;
}

//User Schema
export const UserSchema: mongoose.Schema = new mongoose.Schema({
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
  workHistory: [{ type: jobPostSchema, required: false }],
  request: [
    {
      type: { type: String, required: false },
      contractInfo: { type: mongoose.Schema.Types.Mixed, required: false },
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

export const UserModel = mongoose.model("User", UserSchema);
