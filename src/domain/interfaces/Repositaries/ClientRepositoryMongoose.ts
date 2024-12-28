import mongoose, { Schema, Document, Model } from 'mongoose';
import { Client } from '../../entities/Client';
import { User } from '../../entities/User';
import { ClientRepositary } from '../../../application/usecases/client/signupClient';
import { UserModel } from '../../entities/User'
import { Notification } from '../../entities/Notification'
import { NotificationModel } from '../../entities/Notification'
import { Post } from '../../entities/Post'
import { Admin } from '../../entities/Admin';
import { AdminRepositary } from '../../../application/usecases/admin/loginAdmin';
import { AdminModel } from '../Repositaries/AdminRepository'
import bcrypt from 'bcrypt';
import validator from 'validator';


interface ClientDocument extends Document {
  name: string;
  password?: string;
  email: string;
  companyName?: string;
  description?: string;
  location?: string;
  totalEmployees: number,
  domain?: string;
  since?: number,
  totalJobs?: number
  isVerified?: boolean,
  isGoogle?: boolean
};

const ClientSchema = new Schema<ClientDocument>({
  name: { type: String, required: true },
  password: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  location: { type: String, required: false },
  companyName: { type: String, required: false },
  description: { type: String, required: false },
  totalEmployees: { type: Number, required: false },
  domain: { type: String, required: false },
  since: { type: Number, required: false },
  totalJobs: { type: Number, required: false },
  isVerified: { type: Boolean, required: false },
  isGoogle: { type: Boolean, required: false }
});

export const ClientModel: Model<ClientDocument> = mongoose.model<ClientDocument>('Client', ClientSchema);


interface JobPostDocument extends Document {
  title: string;
  description: string;
  keyResponsiblities: [string],
  requiredSkills: [string],
  paymentType: 'hourly' | 'fixed',
  ifFixed?: {
    is: boolean,
    amount: number
  };
  ifHourly?: {
    is: boolean,
    amount: number
  };
  estimateTime: Date;
  status: 'on progress' | 'finished';
  payment: boolean;
  jobProposals?: mongoose.Types.ObjectId;
};

const JobPostSchema = new Schema<JobPostDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  keyResponsiblities: { type: [String], required: true },
  requiredSkills: { type: [String], required: true },
  paymentType: { type: String, required: true },
  ifFixed: { type: String, required: false },
  ifHourly: { type: String, required: false },
  estimateTime: { type: Date, required: false },
  status: { type: String, required: true },
  payment: { type: Boolean, required: true },
});

export const JobPostModel: Model<JobPostDocument> = mongoose.model<JobPostDocument>('JobPost', JobPostSchema);


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





export class ClientRepositoryMongoose implements ClientRepositary {

  async createClient(client: Client | any): Promise<Client | any> {

    const salt: number = 10;
    const hashedPassword = await bcrypt.hash(client.password, salt);

    const createdClient = new ClientModel({
      name: client.name,
      email: client.email,
      password: hashedPassword
    });

    const savedClient = await createdClient.save()

    return {
      name: savedClient.name,
      email: savedClient.email,
      password: savedClient.password
    } as unknown as Client;

  }


  async signupClient(client: Client | any): Promise<Client | any> {


    if (!client.name || !client.email || !client.password) {
      throw new Error('Name, email, and password are required');
    }

    if (client.name.length < 4 || client.name.length > 20) {
      throw new Error('Name should be between 4 to 20 characters');
    }


    if (!validator.isEmail(client.email)) {
      throw new Error('Invalid email format');
    }

    if (!validator.isStrongPassword(client.password)) {
      throw new Error('Please enter a strong password');
    }

    const foundClient: any = this.findClientByEmail(client.email);
   

    if (foundClient) {
      return foundClient
    } else {
      return null
    }
  };



  async verifyOtp(client: any): Promise<Client> {


    const { name, email, password } = client.client;

    if (client.mailOtp === parseInt(client.clientOtp.otp)) {

      const salt: number = 10;
      const hashedPassword = await bcrypt.hash(password, salt);


      const createdClient = new ClientModel({
        name: name,
        email: email,
        password: hashedPassword,
        companyName: '',
        description: '',
        totalEmployees: '',
        location: '',
        domain: '',
        since: '',
        totalJobs: '',
        isVerified: false,
        isGoogle: false
      });

      const savedClient = await createdClient.save();

      return {
        name: savedClient.name,
        email: savedClient.email,
        password: savedClient.password
      } as Client;

    } else {
      throw new Error('incorrect OTP');
    }
  }


  async findClientByEmail(email: string): Promise<Client | null> {
    const client = await ClientModel.findOne({ email }).exec();

    if (!client) {
      return null
    } else {

      return {
        _id: client._id,
        name: client.name,
        email: client.email,
        password: client.password,
      } as Client;
    };

  }


  async findClientByEmailAndPassword(email: string, password: string): Promise<Client | any> {

    if (!email || !password) {
      throw new Error('Email, and password are required');
    }


    if (!validator.isEmail(email)) {
      throw new Error('Invalid email format');
    }

    const client = await ClientModel.findOne({ email }).exec();

    if (!client) {
      throw new Error('client not Found');
    }

    if (!client.password) {
      throw new Error('Password is wrong');
    }


    const isValidPassword = await bcrypt.compare(password, client.password);

    if (!isValidPassword) {
      throw new Error('wrong password')
    };


    return {
      _id: client._id,
      name: client.name,
      email: client.email
    } as Client;

  }


  async findClientByOnlyEmail(email: string, name: string): Promise<Client | null> {
    const client = await ClientModel.findOne({ email }).exec();
    if (client) {

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



  async resetPassword(clientId: string, password: string): Promise<User | any> {
    const pass = { password: password }

    const updatedClient = await ClientModel.findByIdAndUpdate(clientId, pass, { new: true }).exec();

    if (!updatedClient) {
      throw new Error("Client not found or password update failed.");
    }

    return "Password reset successfully!";

  }


  async getClientProfile(clientId: string): Promise<any> {
    const client = await ClientModel.findById(clientId);

    if (!client) {
      throw new Error('Client not found')
    }

    return client;
  }



  
  async editClientProfile(clientId: string, editData: any): Promise<any> {

 
    const updatedClient = await ClientModel.findByIdAndUpdate(clientId, editData, {
      update: true
    }).exec();

    if (!updatedClient) {
      throw new Error("Client not found or password update failed.");
    }

    return "Data updated successfully!";
  }




  async profileVerification(clientId: string, data: any): Promise<any> {
 
    const adminId = process.env.ADMIN_OBJECT_ID;  
    const admin: any = await AdminModel.findById(adminId);
 
    const existingClient: any = await ClientModel.findById(clientId);

    if(existingClient.isVerified) {

       
      for(let x of admin?.request) { 
        if(x.clientId === clientId) {
              throw new Error('Request already send');
           }}

      const request = {
        type: 'Profile Updation Request',
        clientId: clientId,
        status: 'pending',
        data: data
      }

      const existingRequest = await AdminModel.find(request)
  
      const updatedAdmin = await AdminModel.findByIdAndUpdate(
        adminId,
        { $push: { request: request } },
        { new: true }
      ); 
  
    } else {

      for(let x of admin?.request) { 
          if(x.clientId === clientId) {
                throw new Error('Request already send');
         }  }

      const request = {
        type: 'Profile Verification Request',
        clientId: clientId,
        status: 'pending',
        data: data
      }
  
      const updatedAdmin = await AdminModel.findByIdAndUpdate(
        adminId,
        { $push: { request: request } },
        { new: true }
      ); 
   
      return null;
    }
 
  }


  async createJobPost(jobPost: any): Promise<any> {

    const createdJobPost = new JobPostModel({
      title: jobPost.title,
      description: jobPost.description,
      keyResponsiblities: jobPost.keyResponsiblities,
      requiredSkills: jobPost.requiredSkills,
      paymentType: jobPost.paymentType,
      estimateTime: jobPost.date,
      status: jobPost.status,
      payment: jobPost.payment,
    });

    const savedJobPost = await createdJobPost.save();

    return {
      name: savedJobPost.title,
      email: savedJobPost.description,
      password: savedJobPost.payment
    };
  }


  async getAllNotifications(clientId: any): Promise<any> {
    const notifications = await NotificationModel.find({ $or: [{ sender_id: clientId }, { reciever_id: clientId }] })

    if (!notifications) {
      throw new Error('No notification found')
    } else {
      return notifications;
    }
  }

  async findAllJobs(): Promise< any> {
    const allJobs = await JobPostModel.find().exec();

    console.log('The all jobs ', allJobs);

    if(!allJobs) {
      throw new Error('No job found');
    } else {
      return allJobs;
    }
  }


}