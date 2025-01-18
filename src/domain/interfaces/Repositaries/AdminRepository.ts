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



 

