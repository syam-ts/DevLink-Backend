import mongoose, { Schema, Document, Model } from 'mongoose';
import { AdminRepositary } from '../../../application/usecases/admin/loginAdmin'
import { User } from '../../entities/User';
import { UserModel } from './UserRepositoryMongoose '
import { UserRepositary } from '../../../application/usecases/user/signupUser'; 
import { Client } from '../../entities/Client';
import { ClientModel } from './ClientRepositoryMongoose';
import { ClientRepositary } from '../../../application/usecases/client/signupClient'; 
import bcrypt from 'bcrypt';
import validator from 'validator'; 


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
  

 


export class AdminRepository implements AdminRepositary {



  async findAdmin(name: string, password: string): Promise< any > {

    if (!name || !password) {
        throw new Error('Name and password are required');
    }

    if(name !== process.env.ADMIN_USERNAME) {
        throw new Error('Username is incorrect');

    }

    if(password !== process.env.ADMIN_PASSWORD) {
        throw new Error('Password is incorrect');

    } 
      
    return {
        name: name
    }
    
  } 
 

  async findAllUsers(): Promise<User | any> {
     const users: any = await UserModel.find().exec();
     if (users) { 
   
    return { 
      ...users
    } as User;
         } else {
          throw new Error('Users not Found')
         }
     }

 

  async findAllClients(): Promise<Client | any> {
     const clients: any = await ClientModel.find().exec();
     if (clients) { 
 
      console.log('All clients : ', clients);
     
    return { 
      ...clients
    } as Client;
         } else {
          throw new Error('Clients not Found')
         }
     } 


     async blockUser(userId: any): Promise< any > {

      const user = await UserModel.findByIdAndUpdate(userId, 
        {isBlocked: true}, {new: true}
      ).exec();


      if(!user) {
        throw new Error('User not Found')
      }

        return user;

     }


     async unBlockUser(userId: any): Promise< any > {

      const user = await UserModel.findByIdAndUpdate(userId, 
        {isBlocked: false}, {new: true}
      ).exec();


      if(!user) {
        throw new Error('User not Found')
      }

        return user;

     }
  }

