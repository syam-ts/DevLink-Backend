import mongoose, { Schema, Document, Model } from 'mongoose';
import { Client } from '../../entities/Client';
import { User } from '../../entities/User';
import { ClientRepositary } from '../../../application/usecases/client/signupClient'; 
import { UserModel } from './UserRepositoryMongoose '
import bcrypt from 'bcrypt';
import validator from 'validator'; 

 
interface ClientDocument extends Document {
  name: string;
  email: string;
  password: string;
  mobile: number;
};
 
const ClientSchema = new Schema<ClientDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  mobile: { type: Number, required: false },
});


//user
interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false }
});


 
export const ClientModel: Model<ClientDocument> = mongoose.model<ClientDocument>('Client', ClientSchema);



export class ClientRepositoryMongoose implements ClientRepositary {

  async createClient(client: Client | any): Promise<Client | any> {

    const salt: number = 10;
    const hashedPassword = await bcrypt.hash(client.password, salt);

    const createdClient = new ClientModel({
      name: client.name, 
      email: client.email,
      password: hashedPassword,
      mobile: client.mobile,
    });

    const savedClient = await createdClient.save()

    return {
      name: savedClient.name,
      email: savedClient.email,
      password: savedClient.password,
      mobile: savedClient.mobile,
    } as unknown as Client;

  }


  async signupClient(client: Client | any): Promise<Client | any> {
    

    if (!client.name || !client.email || !client.password) {
      throw new Error('Name, email, and password are required');
  }
  
  if(client.name.length < 4 || client.name.length > 20) {
     throw new Error('Name should be between 4 to 20 characters');
  }

  if(client.mobile.length < 10 || client.mobile.length > 12) {
     throw new Error('invalid Mobile Number');
  }
  
  if (!validator.isEmail(client.email)) {
      throw new Error('Invalid email format');
  }

  if (!validator.isStrongPassword(client.password)) {
      throw new Error('Please enter a strong password');
  }

  const foundClient: any = this.findClientByEmail(client.email);
   
      if(foundClient) {
            return foundClient
      } else {
           return null
      }  
  };
  
  

  async verifyOtp( client: any): Promise<Client | null> {
 
 
    const { name, email, password, mobile } = client.client;
   
  if(client.mailOtp === parseInt(client.clientOtp.otp)) { 

    console.log('Reached here', client.client.password)
    const salt: number = 10;
    const hashedPassword = await bcrypt.hash(password, salt);


    const createdClient = new ClientModel({
      name: name, 
      email: email,
      password: hashedPassword,
      mobile: mobile,
    });

    const savedClient = await createdClient.save();

    return {
      name: savedClient.name,
      email: savedClient.email,
      password: savedClient.password
    } as Client;
  } else {
    throw new Error ('incorrect OTP');
    }
  }


  async findClientByEmail(email: string): Promise<Client | null> {
    const client = await ClientModel.findOne({ email }).exec();
    if (!client) {
      return null
    } else {

      return {
        name: client.name,
        email: client.email,
        password: client.password,
      } as Client;
    };
    
  }


  async findClientByEmailAndPassword(email: string, password: string): Promise<Client | any> {
   
          if ( !email || !password) {
            throw new Error('Email, and password are required');
        }
      
        
        if (!validator.isEmail(email)) {
            throw new Error('Invalid email format');
        }
 
      const client = await ClientModel.findOne({ email }).exec();
     console.log('the client ', client);

     if (!client) {
       throw new Error('client not Found');
     }

     if (!client.password) {
      throw new Error('Password is wrong');
  }
     

     const isValidPassword = await bcrypt.compare(password, client.password);
      
     if(!isValidPassword) {
      throw new Error('wrong password')
     };
    

    return {
      name: client.name,
      email: client.email
    } as Client;
     
  }


  async findClientByOnlyEmail(email: string, name: string): Promise<Client | null> {
     const client = await ClientModel.findOne({ email }).exec();
     if (client) {
       console.log('the client ', client)

       return { 
        name: client.name,
        email: client.email
      } as Client;
     } else {

       const createdClient = new ClientModel({
         name: name, 
         email: email
        });
       

    const savedClient = await createdClient.save();

     
    return { 
      name: savedClient.name,
      email: savedClient.email
    } as Client;
  }


     }


  async findAllUsers(): Promise<User | any> {
     const users: any = await UserModel.find().exec();
     if (users) { 
 
     
    return { 
      ...users
    } as User;
         } 
     }
     
  }

