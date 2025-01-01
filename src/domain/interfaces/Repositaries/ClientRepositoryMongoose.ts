import mongoose, { Schema, Document, Model } from 'mongoose';
import { Client, ClientModel } from '../../entities/Client';
import { User } from '../../entities/User';
import { ClientRepositary } from '../../../application/usecases/client/signupClient';
import { UserModel } from '../../entities/User' 
import { NotificationModel } from '../../entities/Notification'
import { JobPostModel } from '../../entities/JobPost' 
import { AdminModel } from '../../entities/Admin'
import bcrypt from 'bcrypt';
import validator from 'validator';


  




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


    const isValidPassword = await bcrypt.compare(password, client.password as string);

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

 

  async profileVerification(clientId: any, data: any): Promise<any> {
    const adminId = process.env.ADMIN_OBJECT_ID;   
    const existingClient: any = await ClientModel.findById(clientId);
 
    if(existingClient.isEditRequest) {
      throw new Error('Request already sended');
    }

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
      
      const editclientRequest = await ClientModel.findByIdAndUpdate(clientId,
        {isEditRequest : true },
        { update : true }
      );

      return updatedAdmin;
  }

  async editClientProfile(clientId: string, editData: any): Promise<any> {

    const adminId = process.env.ADMIN_OBJECT_ID;   
    const existingClient: any = await ClientModel.findById(clientId);

     
    if(existingClient.isEditRequest) {
      throw new Error('Request already sended');
    }
 
      const request = {
        type: 'Profile Updation Request',
        clientId: clientId,
        status: 'pending',
        data: editData
      }
 
      const updatedAdmin = await AdminModel.findByIdAndUpdate(
        adminId,
        { $push: { request: request } },
        { new: true }
      ); 
      
      const editclientRequest = await ClientModel.findByIdAndUpdate(clientId,
        {isEditRequest : true },
        { update : true }
      );

      return updatedAdmin;
  }


  async createJobPost(jobPost: any): Promise<any> {
 

    if(jobPost.formData.paymentType === 'hourly') {

      const minWorkingHours: number = jobPost.estimateTime * 8;
      const finalDate: number = (jobPost.estimateTime * 24 ) - minWorkingHours;

      const totalAmount = finalDate * jobPost.payment;

      // jobPost.amount = totalAmount; //updatig the total amount
   
      
      
    const createdJobPost = new JobPostModel({
      title: jobPost.formData.title,
      description: jobPost.formData.description,
      keyResponsiblities: jobPost.formData.keyResponsiblities,
      requiredSkills: jobPost.formData.requiredSkills,
      paymentType: jobPost.formData.paymentType,
      estimateTime: jobPost.formData.estimateTime,
      amount: jobPost.formData.payment,
      status: "pending",
      isPayment: true,
    });

    const savedJobPost = await createdJobPost.save();
    

    return {
      name: savedJobPost.title,
      email: savedJobPost.description
    };


    } else {
      
      return jobPost; 


    }

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
 
    if(!allJobs) {
      throw new Error('No job found');
    } else {
      return allJobs;
    }
  }


  async getUserProfile(userId: string): Promise< any> {
    const userProfile = await UserModel.findById(userId).exec();

    
    if(!userProfile) {
      throw new Error('User not found');
    } else {
      return userProfile;
    }
  }


}