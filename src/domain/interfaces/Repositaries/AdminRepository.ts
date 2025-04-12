import mongoose, { Schema, Document, Model } from "mongoose";
import { AdminRepositary } from "../../../application/usecases/admin/loginAdmin";
import { User } from "../../entities/User";
import { UserModel } from "../../entities/User";
import { NotificationModel } from "../../entities/Notification";
import { Client, ClientModel } from "../../entities/Client";
import { AdminModel } from "../../entities/Admin"; 
import { ContractDocument, ContractModel } from "../../entities/Contract";

interface Wallet {
   balance: number,
   transactions: {
     type: string
        amount: number
        from: string
        fromId: string
        createdAt: Date
   }
}

export class AdminRepository implements AdminRepositary {
  async findAdmin(name: string, password: string): Promise<{_id: undefined | string}> {
    if (name !== process.env.ADMIN_USERNAME) {
      throw new Error("Username is incorrect");
    }
    if (password !== process.env.ADMIN_PASSWORD) {
      throw new Error("Password is incorrect");
    }

    return { _id: process.env.ADMIN_OBJECT_ID };
  }
  
  async findAllUsers(): Promise<User[]> {
    const users = await UserModel.find().lean<User[]>().exec();  
  
    if (!users || users.length === 0) {
      throw new Error("Users not found");
    }
  
    return users;
  }
  
  
  

  async getAllUsers(page: number, sortType: string): Promise<{users: User[], totalPages: number}> {
    const PAGE_SIZE: number = 5;
    const skip: number = (page - 1) * PAGE_SIZE;
    const totalUsers: number = await UserModel.countDocuments({});
    const totalPages = Math.ceil(totalUsers / PAGE_SIZE);
    let users;

    if (sortType === "latest") {
      users = await UserModel.aggregate([
        { $match: {} },
        { $sort: { createdAt: 1 } },
        { $skip: skip },
        { $limit: PAGE_SIZE },
      ]);
    } else if (sortType === "block") {
      users = await UserModel.aggregate([
        { $match: {} },
        { $sort: { isBlocked: 1 } },
        { $skip: skip },
        { $limit: PAGE_SIZE },
      ]);
    } else if (sortType === "unBlock") {
      users = await UserModel.aggregate([
        { $match: {} },
        { $sort: { isBlocked: -1 } },
        { $skip: skip },
        { $limit: PAGE_SIZE },
      ]);
    } else {
      throw new Error("Wrong selection");
    }

    if (!users) throw new Error("Users not found");

    return {
      users,
      totalPages,
    };
  }

  async getAllClients(page: number, sortType: string): Promise<{ clients: Client[], totalPages: number}> {
    const PAGE_SIZE: number = 5;
    const skip: number = (page - 1) * PAGE_SIZE;
    const totalClients: number = await ClientModel.countDocuments({});
    const totalPages = Math.ceil(totalClients / PAGE_SIZE);
    let clients;

    if (sortType === "latest") {
      clients = await ClientModel.aggregate([
        { $match: {} },
        { $sort: { createdAt: 1 } },
        { $skip: skip },
        { $limit: PAGE_SIZE },
      ]);
    } else if (sortType === "block") {
      clients = await ClientModel.aggregate([
        { $match: {} },
        { $sort: { isBlocked: 1 } },
        { $skip: skip },
        { $limit: PAGE_SIZE },
      ]);
    } else if (sortType === "unBlock") {
      clients = await ClientModel.aggregate([
        { $match: {} },
        { $sort: { isBlocked: -1 } },
        { $skip: skip },
        { $limit: PAGE_SIZE },
      ]);
    } else {
      throw new Error("Wrong selection");
    }

    if (!clients) throw new Error("Clients not found");

    return {
      clients,
      totalPages,
    };
  }

   
  async viewWallet(currentPage: number): Promise<{adminWallet: Wallet[], totalPages: number}> {
    const page_size: number = 4;
    const skip: number = (currentPage - 1) * page_size;
    const adminId: string = process.env.ADMIN_OBJECT_ID as string;

    const wallet = await AdminModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(adminId) } },
      { $project: { totalTransactions: { $size: "$wallet.transactions" } } },
    ]);

    const totalTransactions =
      wallet.length > 0 ? wallet[0].totalTransactions : 0;

    const totalPages: number = Math.ceil(totalTransactions / page_size);

    const adminWallet = await AdminModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(adminId) } },
      {
        $project: {
          transactions: {
            $slice: ["$wallet.transactions", skip, page_size],
          },
          balance: "$wallet.balance",
          _id: 0,
        },
      },
    ]);
    
    return {
      adminWallet,
      totalPages,
    };
  }

  async sortUser(sortingType: string): Promise<{users: User[], totalPages: number}> {
    const page = 1;
    const PAGE_SIZE: number = 3;
    const skip: number = (page - 1) * PAGE_SIZE;
    const totalUsers: number = await UserModel.countDocuments({});
    let users;

    if (sortingType === "blocked") {
        users = await UserModel.aggregate([
        { $match: {} },
        { $sort: { isBlocked: 1 } },
        { $skip: skip },
        { $limit: PAGE_SIZE },
      ]);
      const totalPages: number = Math.floor(totalUsers / PAGE_SIZE);
      if(!users) throw new Error('Users not Found')
      if (users) {
        return {
          users,
          totalPages,
        }  
      }
    } else if (sortingType === "unBlocked") {
        users = await UserModel.aggregate([
        { $match: {} },
        { $sort: { isBlocked: -1 } },
        { $skip: skip },
        { $limit: PAGE_SIZE },
      ]);
      const totalPages: number = Math.floor(totalUsers / PAGE_SIZE);
      if(!users) throw new Error('Users not Found')
      if (users) {
        return {
          users,
          totalPages,
        };
      }
    } else if (sortingType === "latest") {
       users = await UserModel.aggregate([
        { $match: {} },
        { $sort: { createdAt: 1 } },
        { $skip: skip },
        { $limit: PAGE_SIZE },
      ]);
      const totalPages: number = Math.floor(totalUsers / PAGE_SIZE);
      if(!users) throw new Error('Users not Found')
      if (users) {
        return {
          users,
          totalPages,
        };
      } 
    } else {
      throw new Error("Invalid sorting type");
    }
    const totalPages: number = Math.floor(totalUsers / PAGE_SIZE);
    if (!users) throw new Error("Users not found");

    return {
      users,
      totalPages
    }
  }
 

  async sortClients(sortingType: string): Promise<{clients: Client[], totalPages:number}> {
    const page = 1;
    const PAGE_SIZE: number = 3;
    const skip: number = (page - 1) * PAGE_SIZE;
    const totalClients: number = await ClientModel.countDocuments({});
    let clients;

    if (sortingType === "block") {
        clients = await ClientModel.aggregate([
        { $match: {} },
        { $sort: { isBlocked: 1 } },
        { $skip: skip },
        { $limit: PAGE_SIZE },
      ]);

      const totalPages: number = Math.floor(totalClients / PAGE_SIZE);
      if (clients) {
        return {
          clients,
          totalPages,
        }  
      }
    } else if (sortingType === "unBlock") {
        clients = await ClientModel.aggregate([
        { $match: {} },
        { $sort: { isBlocked: -1 } },
        { $skip: skip },
        { $limit: PAGE_SIZE },
      ]);
      const totalPages: number = Math.floor(totalClients / PAGE_SIZE);
      if (clients) {
        return {
           clients,
          totalPages,
        }  
      }
    } else if (sortingType === "latest") {
        clients = await ClientModel.aggregate([
        { $match: {} },
        { $sort: { createdAt: 1 } },
        { $skip: skip },
        { $limit: PAGE_SIZE },
      ]);
      const totalPages: number = Math.floor(totalClients / PAGE_SIZE);
      if (clients) {
        return {
          clients,
          totalPages,
        } 
      }  
    } else {
      throw new Error("Clients not Found");
    }
    const totalPages: number = Math.floor(totalClients / PAGE_SIZE);
    if(!clients) throw new Error('Clients not found')
      return {
    clients,
    totalPages
    }
  }

  async findAllClients(): Promise<Client[]> {
    const clients = await ClientModel.find().lean<Client[]>().exec(); 
    if (!clients || clients.length === 0) throw new Error("Clients not found"); 
    return clients;
  }
  
  

  async blockUser(userId: string): Promise<User> {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { isBlocked: true },
      { new: true }
    ).lean<User>().exec(); 

    if (!user) throw new Error("User not Found"); 

    return user;
  }

  async unBlockUser(userId: string): Promise<User> {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { isBlocked: false },
      { new: true }
    ).lean<User>().exec(); 

    if (!user) throw new Error("User not Found"); 

    return user;
  }

  async blockClient(clientId: string): Promise<Client> {
    const client = await ClientModel.findByIdAndUpdate(
      clientId,
      { isBlocked: true },
      { new: true }
    ).lean<Client>().exec(); 

    if (!client) throw new Error("Client not Found"); 

    return client;
  }

  async unBlockClient(clientId: string): Promise<Client> {
    const client = await ClientModel.findByIdAndUpdate(
      clientId,
      { isBlocked: false },
      { new: true }
    ).lean<Client>().exec(); 

    if (!client) throw new Error("Client not Found"); 

    return client;
  }

  //verify client profile
  async verifyAccept(data: {clientId: string, editData: {
    editData: Client, isVerified: boolean, isEditRequest: boolean
  }}): Promise<unknown> {
    const { clientId, editData } = data; 

    const adminId = process.env.ADMIN_OBJECT_ID;

    editData.isVerified = true;
    editData.isEditRequest = false;

    const client = await ClientModel.findByIdAndUpdate(
      clientId,
      {
        isVerified: true,
        isEditRequest: false,
      },
      {
        new: true,
      }
    );

    const result = await AdminModel.updateOne(
      { "request.clientId": clientId },
      {
        $pull: {
          request: { clientId: clientId },
        },
      }
    );

    let updatedClient;
    if (editData.editData) {
      updatedClient = await ClientModel.findByIdAndUpdate(
        clientId,
        editData.editData,
        {
          new: true,
        }
      ).exec();
    } else {
      updatedClient = await ClientModel.findByIdAndUpdate(clientId, editData, {
        new: true,
      }).exec();
    }

    const createNotification = new NotificationModel({
      type: "Empty",
      message: "Your profile verified successfully",
      sender_id: process.env.ADMIN_OBJECT_ID,
      reciever_id: clientId,
    });

    const savedNotification = await createNotification.save();

    if (!updatedClient) {
      throw new Error("Client not found");
    }

    return {
      name: savedNotification.type,
      email: savedNotification.message,
      password: savedNotification.date,
    };
  }

  async getAllRequests(): Promise<unknown> {
    const adminId = process.env.ADMIN_OBJECT_ID;
    const admin = await AdminModel.findById(adminId).exec();

    if (!admin) throw new Error("Admin not found");
    return admin.request;
  }

  async findClient(clientId: string): Promise<Client> {
    const client = await ClientModel.findById(clientId).lean<Client>().exec();

    if (!client) throw new Error("Client not found"); 
    return client;
  }

  async viewRoleInfo(roleId: string, roleInfo: string): Promise<unknown> {
    if (roleInfo === "user") {
      const user = await UserModel.findById(roleId).exec();

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    } else if ((roleInfo = "client")) {
      const client = await ClientModel.findById(roleId).exec();

      if (!client) throw new Error("Client not found"); 
      return client;
    } else {
      return null;
    }
  }

  async getWallet(adminId: string): Promise<unknown> {
    const admin = await AdminModel.findById(adminId).exec();

    if (!admin) throw new Error("Wallet not found"); 
    return admin.wallet;
  }

  async getAllContracts(): Promise<ContractDocument> {
    const contracts = await ContractModel.find().lean<ContractDocument>().exec();

    if (!contracts) throw new Error("Contracts not found"); 
    return contracts;
  }

  async successMoneyTransfer(
    roleType: string,
    userId: string,
    paymentScreenshot: string,
    amount: number,
    upiId: number,
    requestId: string
  ): Promise<unknown> {

 console.log('Whole data: ',roleType, userId, paymentScreenshot, amount, upiId, requestId);



    const newNotification = await NotificationModel.create({
      type: "Withdraw Money",
      message: "Succesfully transfer the money to bank account",
      sender_id: process.env.ADMIN_OBJECT_ID,
      reciever_id: userId,
      withdrawData: {
        paymentScreenshot: paymentScreenshot,
        amount: amount,
        upiId: upiId,
      },
      createdAt: new Date(),
    });

    newNotification.save();
    const adminId = process.env.ADMIN_OBJECT_ID;

    // Delete withdrawrequest from admin
    const deleteWithdrawRequest = await AdminModel.findOneAndUpdate(
      { "withdrawRequest._id": requestId },
      { $pull: { withdrawRequest: { _id: requestId } } },
      { new: true }
    );

    // add withdraw money to admin entity for Withdraw history
    const addWithdrawMoney = await AdminModel.findByIdAndUpdate(adminId, {
      $push: {
        "revenue.totalWithdrawals": { amount: amount, createdAt: Date.now() },
      },
    });

    // deduct money from admin wallet 
     let walletEntryAdmin = {
          type: "debit",
          amount: amount,
          from: "admin",
          fromId: adminId,
          date: new Date(),
        };
    
    const updateAdminWallet = await AdminModel.findByIdAndUpdate(
          adminId,
          {
            $inc: {
              "wallet.balance": -amount,
            },
            $push: {
              "wallet.transactions": walletEntryAdmin,
              "revenue.grossAmount": {
                amount: amount,
                createdAt: Date.now(),
              },
            },
          },
          { new: true }
        ).exec();

    // deduct money from client wallet
    if(roleType === 'user') {
      const clientDeduction = await UserModel.findByIdAndUpdate(
        userId,
        {
          $inc: {
            "wallet.balance": -amount,
          }
        },
        { new: true }
      ).exec();

    } else {
      const clientDeduction = await ClientModel.findByIdAndUpdate(
        userId,
        {
          $inc: {
            "wallet.balance": -amount,
          }
        },
        { new: true }
      ).exec();
      
    }

    return newNotification;
  }

  async getWithdrawRequests(): Promise<unknown> {
    const adminId = process.env.ADMIN_OBJECT_ID;

    const adminData = await AdminModel.findById(adminId);

    if (!adminData) throw new Error("Admin not found"); 
    return adminData.withdrawRequest;
  }

  async viewContracts(currentPage: number): Promise<{
    contracts: ContractDocument[], totalPages: number
  }> {
    const page_size: number = 4;
    const skip: number = (currentPage - 1) * page_size;

    const totalContracts = await ContractModel.countDocuments(); 
    const contracts = await ContractModel.find().skip(skip).limit(page_size);
    const totalPages: number = Math.ceil(totalContracts / page_size);

    if (!contracts) throw new Error("Contracts not found");

    return { contracts, totalPages };
  }

  async viewSingleContract(contractId: string): Promise<ContractDocument> {
    const contract = await ContractModel.findById(contractId).exec();
    if (!contract) throw new Error("Contract not found");

    return contract;
  }

  async userMetrics(): Promise<{
    totalUsers: number;
    verifiedUsers: number;
    boostedUsers: number;
    totalJobs: number;
  }> {
    const totalUsers = await UserModel.countDocuments({});
    const verifiedUsers = await UserModel.countDocuments({
      isProfileFilled: true,
    });
    const boostedUsers = await UserModel.countDocuments({ isBoosted: true });
    const totalJobsByUser = await UserModel.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$totalJobs" },
        },
      },
    ]);
    const totalJobs: number = totalJobsByUser[0].total;
    return {
      totalUsers,
      verifiedUsers,
      boostedUsers,
      totalJobs,
    };
  }

  async clientMetrics(): Promise<{
    totalClients: number;
    verifiedClients: number;
    totalJobs: number;
  }> {
    const totalClients = await ClientModel.countDocuments({});
    const verifiedClients = await ClientModel.countDocuments({
      isVerified: true,
    });
    const totalJobsByClient = await ClientModel.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$totalJobs" },
        },
      },
    ]);

    const totalJobs: number = totalJobsByClient[0].total;
    return {
      totalClients,
      verifiedClients,
      totalJobs,
    };
  }

  async getRevenue(range: "weekly" | "monthly" | "yearly"): Promise<unknown> {
    let startDate: Date;
    let groupFormat: string;

    if (range === "weekly") {
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 6);
      groupFormat = "%Y-%m-%d";
    } else if (range === "monthly") {
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 29);
      groupFormat = "%Y-%m-%d";
    } else {
      startDate = new Date();
      startDate.setFullYear(startDate.getFullYear() - 1);
      groupFormat = "%Y-%m";
    }

    const revenueDataGrossAmount = await AdminModel.aggregate([
      {
        $unwind: `$revenue.grossAmount`,
      },
      {
        $match: {
          [`revenue.grossAmount.createdAt`]: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: groupFormat,
              date: `$revenue.grossAmount.createdAt`,
            },
          },
          total: { $sum: `$revenue.grossAmount.amount` },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const revenueDataTotalWithdrawals = await AdminModel.aggregate([
      {
        $unwind: `$revenue.totalWithdrawals`,
      },
      {
        $match: {
          [`revenue.totalWithdrawals.createdAt`]: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: groupFormat,
              date: `$revenue.totalWithdrawals.createdAt`,
            },
          },
          total: { $sum: `$revenue.totalWithdrawals.amount` },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    return {
      grossAmount: revenueDataGrossAmount.map((entry) => ({
        date: entry._id,
        amount: entry.total,
      })),
      totalWithdrawals: revenueDataTotalWithdrawals.map((entry) => ({
        date: entry._id,
        amount: entry.total,
      })),
    };
  }
}
