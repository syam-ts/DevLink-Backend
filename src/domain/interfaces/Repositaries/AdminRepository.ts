import mongoose, { Schema, Document, Model } from 'mongoose';
import { AdminRepositary } from '../../../application/usecases/admin/loginAdmin'
import { User } from '../../entities/User';
import { UserModel } from '../../entities/User' 
import { NotificationModel } from '../../entities/Notification'  
import { Client ,ClientModel} from '../../entities/Client';  
import { AdminModel} from '../../entities/Admin' 
 
 

export class AdminRepository implements AdminRepositary {
  
  async findAdmin(name: string, password: string): Promise<any> {

    if (!name || !password) {
      throw new Error('Name and password are required');
    }
    if (name !== process.env.ADMIN_USERNAME) {
      throw new Error('Username is incorrect');
    }
    if (password !== process.env.ADMIN_PASSWORD) {
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



  async getAllUsers(page: number): Promise<User | any> {

    const PAGE_SIZE: number = 3;
    const skip: number = (page - 1) * PAGE_SIZE;
    const totalUsers: number = await UserModel.countDocuments({});
 
    const users: any = await UserModel.aggregate([
      { $match: {} }, 
      { $skip: skip },
      { $limit: PAGE_SIZE }
    ]);  
    const totalPages: number = totalUsers / PAGE_SIZE
    if (users) {
      return {
        ...users, totalPages
      } as User;
    } else {
      throw new Error('Users not Found')
    }
  }




  async getAllClients(page: number): Promise<Client | any> {

    const PAGE_SIZE: number = 3;
    const skip: number = (page - 1) * PAGE_SIZE;
    const totalClients: number = await ClientModel.countDocuments({});
 
    const clients: any = await ClientModel.aggregate([
      { $match: {} }, 
      { $skip: skip },
      { $limit: PAGE_SIZE }
    ]);  
    const totalPages: number = totalClients / PAGE_SIZE
    if (clients) {
      return {
        ...clients, totalPages
      } as Client;
    } else {
      throw new Error('Clients not Found')
    }
  }



  async searchUser(inputData: string): Promise<User | any> {
 
 
    const page = 1;
    const PAGE_SIZE: number = 3;
    const skip: number = (page - 1) * PAGE_SIZE;
    const totalUsers: number = await UserModel.countDocuments({name: {$regex: inputData, $options: 'i'}});
 
    const users: any = await UserModel.aggregate([
      { $match: {name: {$regex: inputData}} }, 
      { $skip: skip },
      { $limit: PAGE_SIZE }
    ]);  
    const totalPages: number = Math.floor(totalUsers / PAGE_SIZE)
    if (users) {
      return {
        ...users, totalPages
      } as User;
 
    } else {
      throw new Error('Users not Found')
    }
  }



  async sortUser(sortingType: string): Promise<User | any> {
 
 
    const page = 1;
    const PAGE_SIZE: number = 3;
    const skip: number = (page - 1) * PAGE_SIZE;
    const totalUsers: number = await UserModel.countDocuments({});

    if(sortingType === 'blocked') {

      const users: any = await UserModel.aggregate([
        { $match: {} }, 
        {$sort: {isBlocked: 1}},
        { $skip: skip },
        { $limit: PAGE_SIZE }
      ]);  
      const totalPages: number = Math.floor(totalUsers / PAGE_SIZE)
      if (users) {
        return {
          ...users, totalPages
        } as User;


    } 
  }else if(sortingType === 'unBlocked') {

      const users: any = await UserModel.aggregate([
        { $match: {} }, 
        {$sort: {isBlocked: -1}},
        { $skip: skip },
        { $limit: PAGE_SIZE }
      ]);  
      const totalPages: number = Math.floor(totalUsers / PAGE_SIZE)
      if (users) {
        return {
          ...users, totalPages
        } as User;


    }
   } else if(sortingType === 'latest') {



      const users: any = await UserModel.aggregate([
        { $match: {} }, 
        {$sort: {createdAt: 1}},
        { $skip: skip },
        { $limit: PAGE_SIZE }
      ]);  
      const totalPages: number = Math.floor(totalUsers / PAGE_SIZE)
      if (users) {
        return {
          ...users, totalPages
        } as User;
    } else {
      return;
    }
    
 
    } else {
      throw new Error('Users not Found')
    }
  }




  async searchClients(inputData: string): Promise<Client | any> {
 
 
    const page = 1;
    const PAGE_SIZE: number = 3;
    const skip: number = (page - 1) * PAGE_SIZE;
    const totalClients: number = await ClientModel.countDocuments({name: {$regex: inputData, $options: 'i'}});
 
    const clients: any = await ClientModel.aggregate([
      { $match: {name: {$regex: inputData}} }, 
      { $skip: skip },
      { $limit: PAGE_SIZE }
    ]);  
    const totalPages: number = Math.floor(totalClients / PAGE_SIZE)
    if (clients) {
      return {
        ...clients, totalPages
      } as Client;
 
    } else {
      throw new Error('Clients not Found')
    }
  }



  async sortClients(sortingType: string): Promise<Client | any> {
 
    const page = 1;
    const PAGE_SIZE: number = 3;
    const skip: number = (page - 1) * PAGE_SIZE;
    const totalClients: number = await ClientModel.countDocuments({});

    if(sortingType === 'blocked') {

      const clients: any = await ClientModel.aggregate([
        { $match: {} }, 
        {$sort: {isBlocked: 1}},
        { $skip: skip },
        { $limit: PAGE_SIZE }
      ]);  
      const totalPages: number = Math.floor(totalClients / PAGE_SIZE)
      if (clients) {
        return {
          ...clients, totalPages
        } as Client;


    } 
  }else if(sortingType === 'unBlocked') {

      const clients: any = await ClientModel.aggregate([
        { $match: {} }, 
        {$sort: {isBlocked: -1}},
        { $skip: skip },
        { $limit: PAGE_SIZE }
      ]);  
      const totalPages: number = Math.floor(totalClients / PAGE_SIZE)
      if (clients) {
        return {
          ...clients, totalPages
        } as Client;


    }
   } else if(sortingType === 'latest') {



      const clients: any = await ClientModel.aggregate([
        { $match: {} }, 
        {$sort: {createdAt: 1}},
        { $skip: skip },
        { $limit: PAGE_SIZE }
      ]);  
      const totalPages: number = Math.floor(totalClients / PAGE_SIZE)
      if (clients) {
        return {
          ...clients, totalPages
        } as Client;
    } else {
      return;
    }
    
 
    } else {
      throw new Error('Clients not Found')
    }
  }



  async findAllClients(): Promise<Client | any> {
    const clients: any = await ClientModel.find().exec();

    if (clients) { 
      return {
        ...clients
      } as Client;
    } else {
      throw new Error('Clients not Found')
    }
  }


  async blockUser(userId: any): Promise<any> {

    const user = await UserModel.findByIdAndUpdate(userId,
      { isBlocked: true }, { new: true }
    ).exec();

    if (!user) {
      throw new Error('User not Found')
    }

    return user;
  }


  async unBlockUser(userId: any): Promise<any> {

    const user = await UserModel.findByIdAndUpdate(userId,
      { isBlocked: false }, { new: true }
    ).exec();


    if (!user) {
      throw new Error('User not Found')
    }

    return user;
  }


  async blockClient(clientId: any): Promise<any> {

    const client = await ClientModel.findByIdAndUpdate(clientId,
      { isBlocked: true }, { new: true }
    ).exec();

    if (!client) {
      throw new Error('Client not Found')
    }

    return client;
  }


  async unBlockClient(clientId: any): Promise<any> {
 

    const client = await ClientModel.findByIdAndUpdate(clientId,
      { isBlocked: false }, { new: true }
    ).exec();


    if (!client) {
      throw new Error('Client not Found')
    }

    return client;
  }


  //verify client profile
  async verifyAccept(data: any): Promise<any> {
 
     
    const { clientId, editData } = data;
 
    const adminId = process.env.ADMIN_OBJECT_ID;

    editData.isVerified = true;
    editData.isEditRequest = false;

    // const client = await ClientModel.findByIdAndUpdate(clientId, {
    //   isVerified: true,
    //   isEditRequest: false
    // }, {
    //   update: true
    // });
 

    const result = await AdminModel.updateOne(
      { "request.clientId": clientId },  
      {
        $pull: {
          request: { clientId: clientId },  
        },
      });
 

        
    const updatedClient: any = await ClientModel.findByIdAndUpdate(clientId, editData, {
      update: true
    }).exec();
 

    const createNotification = new NotificationModel({ 
               type: 'Empty',
               message: 'Your profile verified successfully',
               sender_id:  process.env.ADMIN_OBJECT_ID,
               reciever_id: clientId
          });
      
          const savedNotification = await createNotification.save();
          
          if (!updatedClient) {
            throw new Error('Client not found')
          } 

          return {
            name: savedNotification.type,
            email: savedNotification.message,
            password: savedNotification.date
       };       
    }


  async getAllRequests(): Promise<any> {

    const adminId = process.env.ADMIN_OBJECT_ID;
    const admin: any = await AdminModel.findById(adminId).exec();

    if (!admin) {
      throw new Error('Admin not found')
    }
    return admin.request;
    }


  async findClient(clientId: any): Promise<any> {

    
    const client: any = await ClientModel.findById(clientId).exec();

    if (!client) {
      throw new Error('Client not found')
    }
    return client;
    }


  async viewRoleInfo(roleId: string, roleInfo: string): Promise<any> {

    if(roleInfo === 'user') {
      const user = await UserModel.findById(roleId).exec();

      if(!user) {
        throw new Error('User not found');
      }

      return user
    } else if(roleInfo = 'client') {

      const client: any = await ClientModel.findById(roleId).exec();
  
      if (!client) {
        throw new Error('Client not found')
      }
      return client;
      } else {
        return null;
      }
    } 

  async getWallet(adminId: string): Promise<any> {

    
      const admin: any = await AdminModel.findById(adminId).exec();
  
      if (!admin) {
        throw new Error('Wallet not found')
      }
      return admin.wallet;
      
    } 
  }



 

