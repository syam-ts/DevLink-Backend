import mongoose from 'mongoose';
import validator from 'validator';

export interface User extends mongoose.Document{
    id?: string;
    name: string;
    age?: number,
    password?: string;
    mobile?: number;
    email: string;
    isBlocked: boolean;
    profilePicture?: string;
    location?:string;
    description?:string,
    skills?: [string];
    budget:number,
}

//User Schema
const UserSchema: mongoose.Schema = new mongoose.Schema({
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
    isBlocked: { type: Boolean, required: false },
    profilePicture: { type: String, required: false },
    location: { type: String, required: false },
    description: {type: String, required: false},
    skills: { type: [String], required: false },
    budget: {type: Number, required: false}
   
});

//user model
export const UserModel = mongoose.model("User", UserSchema);


 