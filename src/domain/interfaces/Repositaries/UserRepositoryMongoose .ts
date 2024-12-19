import mongoose, { Schema, Document, Model } from 'mongoose';
import { User } from '../../entities/User';
import { Client } from '../../entities/Client';
import { UserRepositary } from '../../../application/usecases/user/signupUser';
import { ClientRepositary } from '../../../application/usecases/client/signupClient';
import {ClientModel} from './ClientRepositoryMongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import nodemailer from 'nodemailer'
 
interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  mobile: number;
}
 
const UserSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  mobile: { type: Number, required: false },
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


 
const UserModel: Model<UserDocument> = mongoose.model<UserDocument>('User', UserSchema);

//nodemailar
const html = `
  <h1> OTP Recieved </h1>
  <p> 1124 </p>
`;

 async function  main () {
  try {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'syamnandhu3@gmail.com',
            pass: process.env.GMAIL_APP_PASSWORD
        }
    });

    console.log('The pass', process.env.GMAIL_APP_PASSWORD)

    const info = await transporter.sendMail({
        from: 'syamnandhu3@gmail.com',
        to: 'syampro333@gmail.com',
        subject: 'Testing for now',
        text: 'This is a test email',
    });

    console.log('OTP sent', info.messageId);
} catch (error) {
    console.error('Error sending email:', error);
}

} 



export class UserRepositoryMongoose implements UserRepositary {
  async createUser(user: User | any): Promise<User> {

    if (!user.name || !user.email || !user.password) {
      throw new Error('Name, email, and password are required');
  }

  if(user.name.length < 4 || user.name.length > 20) {
     throw new Error('Name should be between 4 to 20 characters');
  }

  
  if (!validator.isEmail(user.email)) {
      throw new Error('Invalid email format');
  }

  if (!validator.isStrongPassword(user.password)) {
      throw new Error('Please enter a strong password');
  }


  main().catch(console.error);


  console.log('success message')

    const salt: number = 10;
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const createdUser = new UserModel({
      name: user.name, 
      email: user.email,
      password: hashedPassword,
      mobile: user.mobile,
    });

    const savedUser = await createdUser.save()

    return { 
      name: savedUser.name,
      email: savedUser.email,
      password: savedUser.password,
      mobile: savedUser.mobile,
    } as User;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email }).exec();
    if (!user) return null;
   
    return { 
      name: user.name,
      email: user.email,
      password: user.password,
      mobile: user.mobile,
    } as User;
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
     
  }

