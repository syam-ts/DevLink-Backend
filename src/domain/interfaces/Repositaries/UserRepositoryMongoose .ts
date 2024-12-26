import mongoose, { Schema, Document, Model } from 'mongoose';
import { User } from '../../entities/User';
import { Client } from '../../entities/Client';
import { UserRepositary } from '../../../application/usecases/user/signupUser'; 
import {ClientModel} from './ClientRepositoryMongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { sendMail } from '../../../utils/send-mail';


 
interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  mobile: number;
  isBlocked: boolean;
  age: number,
  profilePicture?: string;
  description: string,
  location?:string;
  skills?: [string];
  budget: number
}
 
const UserSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  age: { type: Number, required: false},
  mobile: { type: Number, required: false },
  isBlocked: { type: Boolean, required: false },
  profilePicture: { type: String, required: false },
  description: { type: String, required: false},
  location: { type: String, required: false },
  skills: { type: [String], required: false },
  budget: { type: Number, require: false}
});


//client
interface ClientDocument extends Document {
  name: string;
  email: string;
  password: string;
}

const ClientSchema = new Schema<ClientDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false }
});


 
export const UserModel: Model<UserDocument> = mongoose.model<UserDocument>('User', UserSchema);



export class UserRepositoryMongoose implements UserRepositary {

  async createUser(user: User | any): Promise<User | any> {

    const salt: number = 10;
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const createdUser = new UserModel({
      name: user.name, 
      email: user.email,
      password: hashedPassword,
      mobile: user.mobile,
      isBlocked: false
    });

    const savedUser = await createdUser.save()

    return { 
      name: savedUser.name,
      email: savedUser.email,
      password: savedUser.password,
      mobile: savedUser.mobile,
      isBlocked: false
    } as User;

  }


  async signupUser(user: User | any): Promise<User | any> {
    

    if (!user.name || !user.email || !user.password) {
      throw new Error('Name, email, and password are required');
  }
  
  if(user.name.length < 4 || user.name.length > 20) {
     throw new Error('Name should be between 4 to 20 characters');
  }

  if(user.mobile.length < 10 || user.mobile.length > 12) {
     throw new Error('invalid Mobile Number');
  }
  
  if (!validator.isEmail(user.email)) {
      throw new Error('Invalid email format');
  }

  if (!validator.isStrongPassword(user.password)) {
      throw new Error('Please enter a strong password');
  }

  const foundUser: any = this.findUserByEmail(user.email);
   
      if(foundUser) {
            return foundUser
      } else {
           return null
      }  
  };
  
  

  async verifyOtp( user: any): Promise<User> {
 
    const { name, email, password, mobile } = user.user;
    console.log('name', user.user)
   
  if(user.mailOtp === parseInt(user.userOtp.otp)) {

    const salt: number = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = new UserModel({
      name: name, 
      email: email,
      password: hashedPassword,
      mobile: mobile,
      isBlocked: false,
      age: '',
      location:'',
      description:'',
      skills:'',
      budget: ''
    });

    const savedUser = await createdUser.save();

    return { 
      name: savedUser.name,
      email: savedUser.email,
      password: savedUser.password,
      mobile: savedUser.mobile,
    } as User;
  } else {
    throw new Error ('incorrect OTP');
    }
  }

  async findUserById(_id: string): Promise<User | null> {
      const user = await UserModel.findById(_id);

      if(!user) {
        throw new Error('User not found');
      }

      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        mobile: user.mobile,
        location: user.location,
        description: user.description,
        budget: user.budget
      } as User
  }


  async findUserByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email }).exec();
    if (!user) {
      return null
    } else {
      console.log('The whole user', user)

      return { 
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        mobile: user.mobile,
      } as User;
    };
    
  }


  async findUserByEmailAndPassword(email: string, password: string): Promise<User | any> {
   
          if ( !email || !password) {
            throw new Error('Email, and password are required');
        }
      
        
        if (!validator.isEmail(email)) {
            throw new Error('Invalid email format');
        }
 
      const user = await UserModel.findOne({ email }).exec();
     console.log('the user ', user);

     if (!user) {
       throw new Error('User not Found');
     }

     if (!user.password) {
      throw new Error('Password is wrong');
  }
     

     const isValidPassword = await bcrypt.compare(password, user.password);
      
     if(!isValidPassword) {
      throw new Error('wrong password')
     };
    

    return { 
      _id:user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    } as User;
     
  }


  async findUserByOnlyEmail(email: string, name: string): Promise<User | null> {
     const user = await UserModel.findOne({ email }).exec();
     if (user) {
       console.log('the user ', user)

       return { 
        name: user.name,
        email: user.email
      } as User;
     } else {

       const createdUser = new UserModel({
         name: name, 
         email: email
        });
       

    const savedUser = await createdUser.save();

     
    return { 
      name: savedUser.name,
      email: savedUser.email
    } as User;
  }


     }


  async findAllClients(): Promise<Client | any> {
     const clients: any = await ClientModel.find().exec();
     if (clients) { 
  
        return { 
          ...clients
        } as Client;
        } 
     }

  
     async resetPassword(userId: string, password: string): Promise< User | any> {

      const updatedUser = await UserModel.findByIdAndUpdate( userId, {password: password}, {new: true}).exec();

      if (!updatedUser) {
        throw new Error("User not found or password update failed.");
      }

      return "Password reset successfully!";

     }


     async editUserProfile(userId: string, userData: any): Promise< any > {
 
      console.log('The final data',userId, 'whole data', userData )

      const user = await UserModel.findByIdAndUpdate(userId, userData , { update: true }).exec();

        console.log('data updated', user);

        if(!user) throw new Error('User not found');

        return { user }
     }
     
  }

