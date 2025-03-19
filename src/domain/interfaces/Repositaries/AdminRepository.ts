import mongoose, { Schema, Document, Model } from "mongoose";
import { AdminRepositary } from "../../../application/usecases/admin/loginAdmin";
import { User } from "../../entities/User";
import { UserModel } from "../../entities/User";
import { NotificationModel } from "../../entities/Notification";
import { Client, ClientModel } from "../../entities/Client";
import { AdminModel } from "../../entities/Admin";
import { ContractDocument, ContractModel } from "../../entities/Contract";

export class AdminRepository implements AdminRepositary {
  async findAdmin(name: string, password: string): Promise<any> {
    if (name !== process.env.ADMIN_USERNAME) {
      throw new Error("Username is incorrect");
    }
    if (password !== process.env.ADMIN_PASSWORD) {
      throw new Error("Password is incorrect");
    }

    return { _id: process.env.ADMIN_OBJECT_ID };
  }

  async findAllUsers(): Promise<User | any> {
    const users: any = await UserModel.find().exec();

    if (users) {
      return {
        ...users,
      } as User;
    } else {
      throw new Error("Users not Found");
    }
  }

  async getAllUsers(page: number, sortType: string): Promise<User | any> {
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

  async getAllClients(page: number, sortType: string): Promise<Client | any> {
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

  async searchUser(inputData: string): Promise<User | any> {
    const page = 1;
    const PAGE_SIZE: number = 3;
    const skip: number = (page - 1) * PAGE_SIZE;
    const totalUsers: number = await UserModel.countDocuments({
      name: { $regex: inputData, $options: "i" },
    });

    const users: any = await UserModel.aggregate([
      { $match: { name: { $regex: inputData } } },
      { $skip: skip },
      { $limit: PAGE_SIZE },
    ]);
    const totalPages: number = Math.floor(totalUsers / PAGE_SIZE);
    if (users) {
      return {
        ...users,
        totalPages,
      } as User;
    } else {
      throw new Error("Users not Found");
    }
  }

  async viewWallet(currentPage: number): Promise<any> {
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
      ...adminWallet,
      totalPages,
    };
  }

  async sortUser(sortingType: string): Promise<User | any> {
    const page = 1;
    const PAGE_SIZE: number = 3;
    const skip: number = (page - 1) * PAGE_SIZE;
    const totalUsers: number = await UserModel.countDocuments({});

    if (sortingType === "blocked") {
      const users: any = await UserModel.aggregate([
        { $match: {} },
        { $sort: { isBlocked: 1 } },
        { $skip: skip },
        { $limit: PAGE_SIZE },
      ]);
      const totalPages: number = Math.floor(totalUsers / PAGE_SIZE);
      if (users) {
        return {
          ...users,
          totalPages,
        } as User;
      }
    } else if (sortingType === "unBlocked") {
      const users: any = await UserModel.aggregate([
        { $match: {} },
        { $sort: { isBlocked: -1 } },
        { $skip: skip },
        { $limit: PAGE_SIZE },
      ]);
      const totalPages: number = Math.floor(totalUsers / PAGE_SIZE);
      if (users) {
        return {
          ...users,
          totalPages,
        } as User;
      }
    } else if (sortingType === "latest") {
      const users: any = await UserModel.aggregate([
        { $match: {} },
        { $sort: { createdAt: 1 } },
        { $skip: skip },
        { $limit: PAGE_SIZE },
      ]);
      const totalPages: number = Math.floor(totalUsers / PAGE_SIZE);
      if (users) {
        return {
          ...users,
          totalPages,
        } as User;
      } else {
        return;
      }
    } else {
      throw new Error("Users not Found");
    }
  }

  async searchClients(inputData: string): Promise<Client | any> {
    const page = 1;
    const PAGE_SIZE: number = 3;
    const skip: number = (page - 1) * PAGE_SIZE;
    const totalClients: number = await ClientModel.countDocuments({
      name: { $regex: inputData, $options: "i" },
    });

    const clients: any = await ClientModel.aggregate([
      { $match: { companyName: { $regex: inputData } } },
      { $skip: skip },
      { $limit: PAGE_SIZE },
    ]);

    const totalPages: number = Math.floor(totalClients / PAGE_SIZE);

    if (clients) {
      return {
        ...clients,
        totalPages,
      } as Client;
    } else {
      throw new Error("Clients not Found");
    }
  }

  async sortClients(sortingType: string): Promise<Client | any> {
    const page = 1;
    const PAGE_SIZE: number = 3;
    const skip: number = (page - 1) * PAGE_SIZE;
    const totalClients: number = await ClientModel.countDocuments({});

    if (sortingType === "block") {
      const clients: any = await ClientModel.aggregate([
        { $match: {} },
        { $sort: { isBlocked: 1 } },
        { $skip: skip },
        { $limit: PAGE_SIZE },
      ]);

      const totalPages: number = Math.floor(totalClients / PAGE_SIZE);
      if (clients) {
        return {
          ...clients,
          totalPages,
        } as Client;
      }
    } else if (sortingType === "unBlock") {
      const clients: any = await ClientModel.aggregate([
        { $match: {} },
        { $sort: { isBlocked: -1 } },
        { $skip: skip },
        { $limit: PAGE_SIZE },
      ]);
      const totalPages: number = Math.floor(totalClients / PAGE_SIZE);
      if (clients) {
        return {
          ...clients,
          totalPages,
        } as Client;
      }
    } else if (sortingType === "latest") {
      const clients: any = await ClientModel.aggregate([
        { $match: {} },
        { $sort: { createdAt: 1 } },
        { $skip: skip },
        { $limit: PAGE_SIZE },
      ]);
      const totalPages: number = Math.floor(totalClients / PAGE_SIZE);
      if (clients) {
        return {
          ...clients,
          totalPages,
        } as Client;
      } else {
        return;
      }
    } else {
      throw new Error("Clients not Found");
    }
  }

  async findAllClients(): Promise<Client | any> {
    const clients: any = await ClientModel.find().exec();

    if (clients) {
      return {
        ...clients,
      } as Client;
    } else {
      throw new Error("Clients not Found");
    }
  }

  async blockUser(userId: any): Promise<any> {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { isBlocked: true },
      { new: true }
    ).exec();

    if (!user) {
      throw new Error("User not Found");
    }

    return user;
  }

  async unBlockUser(userId: any): Promise<any> {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { isBlocked: false },
      { new: true }
    ).exec();

    if (!user) {
      throw new Error("User not Found");
    }

    return user;
  }

  async blockClient(clientId: any): Promise<any> {
    const client = await ClientModel.findByIdAndUpdate(
      clientId,
      { isBlocked: true },
      { new: true }
    ).exec();

    if (!client) {
      throw new Error("Client not Found");
    }

    return client;
  }

  async unBlockClient(clientId: any): Promise<any> {
    const client = await ClientModel.findByIdAndUpdate(
      clientId,
      { isBlocked: false },
      { new: true }
    ).exec();

    if (!client) {
      throw new Error("Client not Found");
    }

    return client;
  }

  //verify client profile
  async verifyAccept(data: any): Promise<any> {
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

  async getAllRequests(): Promise<any> {
    const adminId = process.env.ADMIN_OBJECT_ID;
    const admin: any = await AdminModel.findById(adminId).exec();

    if (!admin) {
      throw new Error("Admin not found");
    }
    return admin.request;
  }

  async findClient(clientId: any): Promise<Client> {
    const client: any = await ClientModel.findById(clientId).exec();

    if (!client) {
      throw new Error("Client not found");
    }
    return client;
  }

  async viewRoleInfo(roleId: string, roleInfo: string): Promise<any> {
    if (roleInfo === "user") {
      const user = await UserModel.findById(roleId).exec();

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    } else if ((roleInfo = "client")) {
      const client: any = await ClientModel.findById(roleId).exec();

      if (!client) {
        throw new Error("Client not found");
      }
      return client;
    } else {
      return null;
    }
  }

  async getWallet(adminId: string): Promise<any> {
    const admin: any = await AdminModel.findById(adminId).exec();

    if (!admin) {
      throw new Error("Wallet not found");
    }
    return admin.wallet;
  }

  async getAllContracts(): Promise<ContractDocument> {
    const contracts: any = await ContractModel.find().exec();

    if (!contracts) {
      throw new Error("Contracts not found");
    }
    return contracts;
  }

  async successMoneyTransfer(
    userId: string,
    paymentScreenshot: string,
    amount: number,
    upiId: number,
    requestId: string
  ): Promise<any> {
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

    // Delete withdrawrequest from admin
    const deleteWithdrawRequest = await AdminModel.findOneAndUpdate(
      { "withdrawRequest._id": requestId },
      { $pull: { withdrawRequest: { _id: requestId } } },
      { new: true }
    );

    return newNotification;
  }

  async getWithdrawRequests(): Promise<any> {
    const adminId = process.env.ADMIN_OBJECT_ID;

    const adminData = await AdminModel.findById(adminId);

    if (!adminData) throw new Error("Admin not found");

    return adminData.withdrawRequest;
  }

  async viewContracts(): Promise<any> {
    //limit to 4
    const contracts = await ContractModel.find().limit(5).exec();

    if (!contracts) throw new Error("Contracts not found");

    return contracts;
  }

  async viewSingleContract(contractId: string) {
    const contract = await ContractModel.findById(contractId).exec();
    if (!contract) throw new Error("Contract not found");

    return contract;
  }

  async userMetrics(): Promise<{totalUsers: number,verifiedUsers: number,
    boostedUsers: number,
    totalJobs: number }> {
    const totalUsers = await UserModel.countDocuments({});
    const verifiedUsers = await UserModel.countDocuments({ isProfileFilled: true });
    const boostedUsers = await UserModel.countDocuments({ isBoosted: true });
    const totalJobsByUser = await UserModel.aggregate([
      {
        $group: {
          _id: null,
          total: {$sum: "$totalJobs"}
        }
      }
    ]);
    const totalJobs: number = totalJobsByUser[0].total;
    return { 
        totalUsers,
        verifiedUsers,
        boostedUsers,
        totalJobs 
    };
  }

  async clientMetrics(): Promise<{  totalClients: number; verifiedClients: number; totalJobs: number }> {
    const totalClients = await ClientModel.countDocuments({});
    const verifiedClients = await ClientModel.countDocuments({ isVerified: true });
    const totalJobsByClient = await ClientModel.aggregate([
      {
        $group: {
          _id: null,
          total: {$sum: "$totalJobs"}
        }
      }
    ]);

    const totalJobs: number = totalJobsByClient[0].total
    return { 
        totalClients,
        verifiedClients,
        totalJobs, 
    };
  }

async revenue() {
  
}

};