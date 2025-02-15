import mongoose from 'mongoose';
import validator from 'validator';
import { JobPostDocument, JobPostSchema } from './JobPost'; 


export interface User extends mongoose.Document{
    name: string;
    age?: number,
    password?: string;
    mobile?: number;
    email: string;
    profilePicture?: string;
    description?:string,
    location?:string;
    skills?: [string];
    experience: string, 
    budget:number,
    rating: number,  
    review: string[],
    totalJobs: number,
    totalHours: number,
    domain: string,
    whyHireMe: string,
    githubLink: string,
    education: [string],
    completedJobs: number,
    inProgress: number,
    workHistory: [JobPostDocument],
    isEditRequest: boolean,
    request: [{
            type: string,
            contractInfo: mongoose.Schema.Types.Mixed,
            created: Date
        } ],
        wallet: {
          balance: {type: Number, required: false}, 
          transactions: [
              {
                  type: []
              }
          ]
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
        required: [true, 'Name is required'],
        index: true,
        minlength: [4, 'Name must be at least 4 characters long'],
        maxlength: [50, 'Name cannot exceed 50 characters'],
      }, 
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
          validator: (value: string) => validator.isEmail(value),
          message: 'Invalid email address',
        },
      },
      age: {
        type: String,
        require: false
      },
      password: {
        type: String,
        required: false ,
        validate(value: string) {
        if(!validator.isStrongPassword(value)) {
          throw new Error('Please enter strong password ' + value)
        }
        }
      },
    mobile: { type: Number, required: false },
    profilePicture: { type: String, required: false },
    key: { type: String, required: false },
    location: { type: String, required: false },
    description: {type: String, required: false},
    skills: { type: [String], required: false },
    experience: { type: String, required: false },
    experienceDescription: { type: String, required: false },
    budget: {type: Number, required: false},
    rating: {type: Number, required: false},
    review: {type: [String], required: false},
    totalJobs: {type: Number, required: false},
    totalHours: {type: Number, required: false},
    domain: {type: String, required: false},
    githubLink: {type: String, required: false},
    whyHireMe: {type: String, required: false},
    education: {type: [String], required: false},
    completedJobs: {type: Number, required: false},
    inProgress: {type: Number, required: false},
    workHistory: {type: [JobPostSchema], required: false},   
     request: [{
            type: {type: String, required: false},
            contractInfo: {type: mongoose.Schema.Types.Mixed, required: false},
            date: {type: Date, required: false}
             }],
        wallet: {
          balance: {type: Number, required: false}, 
          transactions: [{
                  type: Array
              }]
      },
      isBoosted: { type: Boolean, required: false },
    isBlocked: { type: Boolean, required: false },
    isEditRequest: { type: Boolean, required: false},
    isProfileFilled: {type: Boolean, required: false},
    createdAt: {type: Date, required: false},
   
});

//user model
export const UserModel = mongoose.model("User", UserSchema);


 