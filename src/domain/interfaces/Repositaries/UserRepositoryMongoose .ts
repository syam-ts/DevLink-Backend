import mongoose, { Schema, Document, Model } from 'mongoose';
import { User } from '../../entities/User'; 
import { UserModel } from '../../entities/User'
import { Client, ClientModel } from '../../entities/Client';
import { JobPostModel } from '../../entities/JobPost' 
import { UserRepositary } from '../../../application/usecases/user/signupUser';  
import bcrypt from 'bcrypt';
import validator from 'validator'; 
  

export class UserRepositoryMongoose implements UserRepositary {

  async createUser(user: User | any): Promise<User | any> {

    const salt: number = parseInt(process.env.BCRYPT_SALT as string);
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
        profilePicture: user.profilePicture,
        mobile: user.mobile,
        location: user.location,
        skills: user.skills,
        budget: user.budget,
        isBlocked: user.isBlocked,
      } as User
  }


  async findUserByEmail(email: string): Promise<User | null> {

    const user = await UserModel.findOne({ email }).exec();
    if (!user) {
      return null
    } else { 

      return { 
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        mobile: user.mobile,
      } as User;
    } 
  }


  async findUserByEmailAndPassword(email: string, passwordUser: string): Promise<User | any> {
   
          if ( !email || !passwordUser) {
            throw new Error('Email, and password are required');
           }
      
        if (!validator.isEmail(email)) {
            throw new Error('Invalid email format');
           }
 
      const user = await UserModel.findOne({ email }).exec();
 
     if (!user) {
       throw new Error('User not Found');
          }

     if (!user.password) {
      throw new Error('Password is wrong');
         }

     const { password }: any = user
     const isValidPassword = await bcrypt.compare(passwordUser, password);
      
     if(!isValidPassword) {
      throw new Error('wrong password')
     }
     console.log('The whole data : ', user)

    return { 
      _id:user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      mobile: user.mobile,
      description: user.description,
      location: user.locaiton,
      isBlocked: user.isBlocked,
      budget: user.budget,
      skills: user.skills
    } as User;
  }


  async findUserByOnlyEmail(email: string, name: string, password: any): Promise<any | null> {

     const user = await UserModel.findOne({ email }).exec();
     if (user) {
       return { 
        _id: user._id,
        name: user.name,
        email: user.email
      } as User;
     } else {
        const salt: number = 10;
        const hashedPassword = await bcrypt.hash(password, salt);

        const createdUser = new UserModel({
             name: name, 
             email: email,
             password: hashedPassword,
             mobile: "",
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
        mobile: savedUser.mobile,
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
  
      const user = await UserModel.findByIdAndUpdate(userId, userData , { update: true }).exec();
 
        if(!user) throw new Error('User not found');
        return { user }
     }



     
       async findAllJobs(): Promise< any> {
         const allJobs = await JobPostModel.find().exec();
      
         if(!allJobs) {
           throw new Error('No job found');
         } else {
           return allJobs;
         }
       }
  }

