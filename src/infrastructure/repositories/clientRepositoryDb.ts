 
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { IUser } from "../../domain/entities/User";
import { ClientModel } from "../database/Schema/clientSchema";
import { IClient } from "../../domain/entities/Client";
import { ContractModel } from "../database/Schema/ContractSchema";
import { AdminModel } from "../database/Schema/adminSchema";
import { NotificationModel } from "../database/Schema/notificationSchema";
import { UserModel } from "../database/Schema/userSchema";
import { JobPostModel } from "../database/Schema/jobSchema";
import { ProjectSubmissions } from "../../application/usecases/client/viewSubmissions";
import { IAdmin } from "../../domain/entities/Admin";
import { IContractDocument } from "../../domain/entities/Contract";

type Id = string;

export interface Extra {
  userId: Id;
}

interface Invite {
  clientId?: Id;
  userId?: Id;
  description: String;
  jobPostData?: {
    title: string;
    description: string;
    expertLevel: String;
    location: string;
    requiredSkills: string[];
    amount: number;
    paymentType: String;
    estimateTimeinHours: Number;
    projectType: String;
  };

  clientData: {
    companyName: string;
    email: string;
    location: string;
  };
  status: String;
  createdAt: Date;
}

interface Wallet {
  balance: number;
  transactions: {
    type: string;
    amount: number;
    from: string;
    fromId: string;
    createdAt: Date;
  };
}

interface Proposal {
  type: string;
  UserId: string;
  jobPostId: string;
  jobPostInfo: string;
  userData: IUser;
  description?: string | undefined;
  status?: string | undefined;
  bidamount: number;
  bidDeadline: number;
  createdAt: Date;
}

interface CreateClient {
  name: string;
  email: string;
  password: string;
}

export class ClientRepositoryDb {
  async createClient(client: IClient): Promise<IClient> {
    if (!client.password) throw new Error("Password is required");

    const salt: number = 10;
    const hashedPassword = await bcrypt.hash(client.password, salt);

    const createdClient = new ClientModel({
      companyName: client.companyName,
      email: client.email,
      password: hashedPassword,
    });

    const savedClient = await createdClient.save();

    return {
      companyName: savedClient.companyName as string,
      email: savedClient.email as string,
      password: savedClient.password as string,
    } as IClient;
  }

  async signupClient(email: string): Promise<IClient | null> {
    const foundClient = this.findClientByEmail(email);
    if (!foundClient) throw new Error("Client Not Found");
    return foundClient;
  }

  async verifyOtp(client: {
    mailOtp: number;
    userOtp: string;
    user: {
      otp: string;
      data: { name: string; email: string; password: string };
    };
  }): Promise<IClient> {
    const { name, email, password } = client.user.data;

    if (client.mailOtp === parseInt(client.userOtp)) {
      const salt = 10;

      const hashedPassword = await bcrypt.hash(password, salt);

      let wallet = {
        balance: 0,
        transactions: [
          {
            type: "",
            amount: 0,
            from: "",
            fromId: "",
            date: "",
          },
        ],
      };

      const createdClient = new ClientModel({
        companyName: name,
        email: email,
        password: hashedPassword,
        description: "",
        numberOfEmployees: "",
        location: "",
        domain: "",
        since: "",
        totalJobs: 0,
        isVerified: false,
        isGoogle: false,
        totalSpend: 0,
        totalHours: 0,
        wallet: { wallet },
        request: [],
        isBlocked: false,
        createdAt: new Date(),
      });

      const savedClient = await createdClient.save();

      return {
        companyName: savedClient.companyName,
        email: savedClient.email,
        password: savedClient.password,
      } as IClient;
    } else {
      throw new Error("incorrect OTP");
    }
  }

  async findClientByEmail(email: string): Promise<IClient | null> {
    const client = await ClientModel.findOne({ email }).exec();

    if (!client) {
      return null;
    } else {
      return {
        _id: client._id,
        companyName: client.companyName,
        email: client.email,
        password: client.password,
      } as any;
    }
  }

  async findClientByEmailAndPassword(
    email: string,
    password: string
  ): Promise<{
    _id: string;
    companyName: string;
    email: string;
    password: string;
    isBlocked: boolean;
    isVerified: boolean;
  }> {
    const client = await ClientModel.findOne({ email }).exec();

    if (!client) {
      throw new Error("client not Found");
    }

    if (client.isBlocked) {
      throw new Error("Client not Authenticated");
    }

    if (!client.password) {
      throw new Error("Password is wrong");
    }

    const isValidPassword = await bcrypt.compare(
      password,
      client.password as string
    );

    if (!isValidPassword) {
      throw new Error("wrong password");
    }

    return {
      _id: String(client._id),
      companyName: String(client.companyName),
      email: String(client.email),
      password: String(client.password),
      isBlocked: Boolean(client.isBlocked),
      isVerified: Boolean(client.isVerified),
    };
  }

  async findClientByOnlyEmail(
    email: string,
    companyName: string,
    password: string
  ): Promise<{
    _id: string;
    companyName: string;
    email: string;
    password: string;
    isBlocked: boolean;
    isVerified: boolean;
  }> {
    const client = await ClientModel.findOne({ email }).exec();
    if (client) {
      return {
        _id: String(client._id),
        companyName: String(client.companyName),
        password: String(client.password),
        email: String(client.email),
        isBlocked: Boolean(client.isBlocked),
        isVerified: Boolean(client.isVerified),
      };
    } else {
      const salt: number = 10;
      const hashedPassword = await bcrypt.hash(password, salt);
      const createdClient = new ClientModel({
        companyName: companyName,
        email: email,
        password: hashedPassword,
        description: "",
        numberOfEmployees: "",
        location: "",
        domain: "",
        since: "",
        totalJobs: 0,
        isVerified: false,
        isGoogle: false,
        totalSpend: 0,
        totalHours: 0,
        wallet: {},
        request: [],
        isBlocked: false,
        createdAt: new Date(),
      });

      const savedClient = await createdClient.save();

      return {
        _id: String(savedClient._id),
        companyName: String(savedClient.companyName),
        password: String(savedClient.password),
        email: String(savedClient.email),
        isBlocked: Boolean(savedClient.isBlocked),
        isVerified: Boolean(savedClient.isVerified),
      };
    }
  }

  async findAllUsers(): Promise<IUser[]> {
    const users = await UserModel.find({
      $and: [{ isProfileFilled: true }, { isBlocked: false }],
    })
      .limit(4)
      .lean<IUser[]>()
      .exec();
    if (!users || users.length === 0) throw new Error("Users not found");

    return users;
  }

  async resetPassword(clientId: Id, password: string): Promise<string> {
    const pass = { password: password };

    const updatedClient = await ClientModel.findByIdAndUpdate(clientId, pass, {
      new: true,
    }).exec();

    if (!updatedClient) {
      throw new Error("Client not found or password update failed.");
    }
    return "Password reset successfully!";
  }

  async getClientProfile(clientId: Id): Promise<IClient> {
    const client = await ClientModel.findById(clientId).lean<IClient>().exec();
    if (!client) throw new Error("Client not found");

    return client;
  }

  async profileVerification(
    clientId: Id,
    data: { unChangedData: IClient; editData: IClient }
  ): Promise<IAdmin> {
    const adminId = process.env.ADMIN_OBJECT_ID;
    const existingClient = await ClientModel.findById(clientId);
    if (!existingClient) throw new Error("Client not Exists");

    if (existingClient.isEditRequest) throw new Error("Request already sended");

    const request = {
      type: "Profile Verification Request",
      clientId: clientId,
      status: "pending",
      data: data,
    };

    const updatedAdmin = await AdminModel.findByIdAndUpdate(
      adminId,
      { $push: { request: request } },
      { new: true }
    )
      .lean<IAdmin>()
      .exec();

    if (!updatedAdmin) throw new Error("Admin not found");

    const editclientRequest = await ClientModel.findByIdAndUpdate(
      clientId,
      { isEditRequest: true },
      { update: true }
    );

    return updatedAdmin;
  }

  async editClientProfile(
    clientId: Id,
    editData: { editData: Partial<IClient>; unChangedData: IClient },
    unChangedData: IClient
  ): Promise<IAdmin> {
    const adminId = process.env.ADMIN_OBJECT_ID;
    const existingClient = await ClientModel.findById(clientId).lean<IClient>();
    if (!existingClient) throw new Error("Client not exists");

    if (existingClient.isEditRequest) {
      throw new Error("Request already sended");
    }

    const request = {
      type: "Profile Updation Request",
      clientId: clientId,
      status: "pending",
      data: {
        editData: unChangedData,
        unChangedData: editData,
      },
    };

    const updatedAdmin = await AdminModel.findByIdAndUpdate(
      adminId,
      { $push: { request: request } },
      { new: true }
    )
      .lean<IAdmin>()
      .exec();

    if (!updatedAdmin) throw new Error("Admin not found");

    const editclientRequest = await ClientModel.findByIdAndUpdate(
      clientId,
      { isEditRequest: true },
      { update: true }
    );

    return updatedAdmin;
  }

  async getProposals(clientId: Id): Promise<Proposal[]> {
    const client = await ClientModel.findById(clientId).lean<IClient>().exec();
    if (!client) throw new Error("Client not found");
    const proposals = client.proposals;

    return proposals as unknown as Proposal[];
  }

  async getUserProfile(userId: Id): Promise<IUser> {
    const user = await UserModel.findById(userId).lean<IUser>().exec();

    if (!user) {
      throw new Error("User not found");
    } else {
      const userProfile = {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        profilePicture: user.profilePicture,
        location: user.location,
        description: user.description,
        skills: user.skills,
        experience: user.experience,
        budget: user.budget,
        totalJobs: user.totalJobs,
        totalHours: user.totalHours,
        domain: user.domain,
        githubLink: user.githubLink,
        whyHireMe: user.whyHireMe,
        education: user.education,
        completedJobs: user.completedJobs,
        inProgress: user.inProgress,
        workHistory: user.workHistory,
      };

      return userProfile as any;
    }
  }

  async getallDevelopers(): Promise<IUser[] | unknown> {
    const developers = await UserModel.find({ isProfileFilled: true }).exec();

    if (!developers || developers.length === 0)
      throw new Error("Developers not found");

    return developers;
  }

  async viewContracts(
    clientId: Id,
    contractViewType: string,
    currentPage: number
  ): Promise<{ contract: IContractDocument[]; totalPages: number }> {
    const page_size: number = 3;
    const skip: number = (currentPage - 1) * page_size;

    let contract, totalContracts;
    if (contractViewType === "pending") {
      totalContracts = await ContractModel.countDocuments({
        $and: [{ clientId: clientId }, { status: "on progress" }],
      });
      contract = await ContractModel.find({
        $and: [{ clientId: clientId }, { status: "on progress" }],
      })
        .skip(skip)
        .limit(page_size);
    } else if (contractViewType === "submitted") {
      totalContracts = await ContractModel.countDocuments({
        $and: [{ clientId: clientId }, { status: "submitted" }],
      });

      contract = await ContractModel.find({
        $and: [{ clientId: clientId }, { status: "submitted" }],
      })
        .skip(skip)
        .limit(page_size);
    } else if (contractViewType === "rejected") {
      totalContracts = await ContractModel.countDocuments({
        $and: [{ clientId: clientId }, { status: "rejected" }],
      });

      contract = await ContractModel.find({
        $and: [{ clientId: clientId }, { status: "rejected" }],
      })
        .skip(skip)
        .limit(page_size);
    } else if (contractViewType === "completed") {
      totalContracts = await ContractModel.countDocuments({
        $and: [{ clientId: clientId }, { status: "closed" }],
      });

      contract = await ContractModel.find({
        $and: [{ clientId: clientId }, { status: "closed" }],
      })
        .skip(skip)
        .limit(page_size);
    } else {
      throw new Error("Bad selection");
    }

    if (!contract) {
      throw new Error("contract not found");
    } else {
      const totalPages = Math.ceil(totalContracts / page_size);
      return { contract, totalPages };
    }
  }

  async viewWallet(
    clientId: Id,
    page: number
  ): Promise<{
    wallet: unknown;
    totalPages: number;
  }> {
    const PAGE_SIZE: number = 6;
    const skip: number = (page - 1) * PAGE_SIZE;

    const theWallet = await ClientModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(clientId) } },
      { $project: { totalTransactions: { $size: "$wallet.transactions" } } },
    ]);

    const totalTransactions =
      theWallet.length > 0 ? theWallet[0].totalTransactions : 0;
    const totalPages: number = totalTransactions / PAGE_SIZE;

    const wallet = await ClientModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(clientId) } },
      {
        $project: {
          transactions: {
            $slice: ["$wallet.transactions", skip, PAGE_SIZE],
          },
          balance: "$wallet.balance",
          _id: 0,
        },
      },
    ]);

    return {
      wallet,
      totalPages,
    };
  }

  async addMoneyToAdminWallet(
    role: string,
    roleId: Id,
    amount: number
  ): Promise<string> {
    const adminId = process.env.ADMIN_OBJECT_ID;
    const admin = await AdminModel.findById(adminId);

    if (!admin) throw new Error("Unknown Error Occured");
    const walletEntry = {
      type: "credit",
      amount: amount,
      from: role,
      fromId: roleId,
      date: new Date(),
    };

    const updateAdminWallet = await AdminModel.findByIdAndUpdate(
      adminId,
      {
        $inc: { "wallet.balance": amount },
        $push: { "wallet.transactions": walletEntry },
      },
      {
        new: true,
        upsert: false,
      }
    ).exec();

    if (!updateAdminWallet) {
      console.error("Update failed. Admin Wallet was not updated.");
      throw new Error("Admin wallet update failed.");
    }
    return "success";
  }

  async viewSubmissions(clientId: Id): Promise<ProjectSubmissions> {
    const client = await ClientModel.findById(clientId).lean<IClient>().exec();
    if (!client) throw new Error("Client not found");

    return client.projectSubmissions as unknown as ProjectSubmissions;
  }

  async createContract(
    clientId: Id,
    userId: Id,
    jobPostId: Id,
    bidAmount: number,
    bidDeadline: string
  ): Promise<{
    newNotificationUser: Notification;
    newNotificationClient: Notification;
  }> {
    // updating job post status
    const currentJobPost = await JobPostModel.findByIdAndUpdate(
      jobPostId,
      {
        status: "on progress",
      },
      {
        update: true,
      }
    ).exec();

    if (!currentJobPost) throw new Error("Jobpost not exists");

    const currentClient = await ClientModel.findById(clientId).exec();
    if (!currentClient) throw new Error("client not exists");

    const currentUser = await UserModel.findById(userId).exec();
    if (!currentUser) throw new Error("user not exists");
    // reomove all the proposals for this jobpost
    const client = await ClientModel.findByIdAndUpdate(
      clientId,
      { $pull: { proposals: { jobPostId: jobPostId } } },
      { new: true }
    );

    const newContract = new ContractModel({
      clientId: clientId,
      userId: userId,
      jobPostId: jobPostId,
      clientData: {
        companyName: currentClient.companyName,
        email: currentClient.email,
        location: currentClient.location,
      },
      userData: {
        name: currentUser.name,
        email: currentUser.email,
        location: currentUser.location,
      },
      jobPostData: {
        title: currentJobPost.title,
        description: currentJobPost.description,
        expertLevel: currentJobPost.expertLevel,
        projectType: currentJobPost.projectType,
      },
      amount: bidAmount,
      deadline: bidDeadline,
      active: true,
      status: "on progress",
      createdAt: new Date(),
    });

    const savedContract = await newContract.save();

    // const timer = currentJobPost.estimateTimeinHours;
    // const contractId = savedContract._id;
    const adminId = process.env.ADMIN_OBJECT_ID;

    const newNotificationUser = (await NotificationModel.create({
      type: "new contract",
      message: "New Contract signed in",
      sender_id: adminId,
      reciever_id: userId,
      newContract: {
        contractId: savedContract._id,
      },
      createdAt: new Date(),
    })) as unknown as any;

    const newNotificationClient = (await NotificationModel.create(
      {
        type: "Contract",
        message: "New Contract signed in",
        sender_id: adminId,
        reciever_id: clientId,
        newContract: {
          contractId: savedContract._id,
        },
        createdAt: new Date(),
      }
    )) as unknown as any;

    newNotificationUser.save();
    newNotificationClient.save();

    //await allCronJobs.startContractHelperFn(timer, jobPostId, userId, contractId);

    return {
      newNotificationUser,
      newNotificationClient,
    };
  }

  async rejectProposal(
    clientId: Id,
    userId: Id,
    jobPostId: Id
  ): Promise<IClient> {
    const proposal = await ClientModel.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(clientId),
        proposals: {
          $elemMatch: {
            userId: new mongoose.Types.ObjectId(userId),
            jobPostId: new mongoose.Types.ObjectId(jobPostId),
          },
        },
      },
      {
        $set: { "proposals.$.status": "rejected" },
      },
      { new: true }
    )
      .lean<IClient>()
      .exec();
    if (!proposal) throw new Error("Client not exists");

    // -------------- decrementing proposalCount --------------
    const updatetingCount = await JobPostModel.findByIdAndUpdate(
      jobPostId,
      {
        $inc: { proposalCount: -1 },
      },
      {
        new: true,
      }
    );
    console.log(updatetingCount);

    return proposal;
  }

  async closeContract(contractId: Id, progress: number): Promise<unknown> {
    //update contract status as closed ----------------
    if (!progress) throw new Error("Progress data missing");

    const currentContract = await ContractModel.findByIdAndUpdate(
      contractId,
      {
        active: false,
        status: "closed",
      },
      { update: true }
    );

    if (!currentContract) throw new Error("Contract not found");

    //update jobpost status as closed ----------------
    const jobPostId = currentContract.jobPostId;

    const currentJobPost = await JobPostModel.findByIdAndUpdate(
      jobPostId,
      {
        status: "closed",
      },
      { new: true }
    );
    if (!currentJobPost) throw new Error("Jobpost not exists");

    const finalAmount = Math.round(
      currentContract.amount - (currentContract.amount * 10) / 100
    );
    const adminDeduction: number = Math.floor(
      (currentContract.amount * 10) / 100
    );
    const adminId = process.env.ADMIN_OBJECT_ID;
    let updateUserWallet, updateAdminWallet, updateClientWallet;

    // find and substract admin wallet ----------------
    const walletEntryAdmin = {
      type: "debit",
      amount: finalAmount,
      from: "admin",
      fromId: adminId,
      date: new Date(),
    };

    updateAdminWallet = await AdminModel.findByIdAndUpdate(
      adminId,
      {
        $inc: {
          "wallet.balance": -finalAmount,
        },
        $push: {
          "wallet.transactions": walletEntryAdmin,
          "revenue.grossAmount": {
            amount: adminDeduction,
            createdAt: Date.now(),
          },
        },
      },
      { new: true }
    ).exec();

    if (progress === 100) {
      const walletEntryUser = {
        type: "credit",
        amount: finalAmount,
        from: "admin",
        fromId: adminId,
        date: new Date(),
      };

      updateUserWallet = await UserModel.findByIdAndUpdate(
        currentContract.userId,
        {
          $inc: { "wallet.balance": finalAmount },
          $push: { "wallet.transactions": walletEntryUser },
        },
        {
          new: true,
          upsert: false,
        }
      ).exec();
    } else {
      //update user wallet according to the progress ----------------
      const userFinalPayment = (finalAmount * progress) / 100;
      const walletEntryUser = {
        type: "credit",
        amount: userFinalPayment,
        from: "admin",
        fromId: adminId,
        date: new Date(),
      };

      updateUserWallet = await UserModel.findByIdAndUpdate(
        currentContract.userId,
        {
          $inc: { "wallet.balance": userFinalPayment },
          $push: { "wallet.transactions": walletEntryUser },
        },
        {
          new: true,
          upsert: false,
        }
      ).exec();

      //rest of the amount go to client wallet ----------------
      const clientLeftoverAmount = finalAmount - userFinalPayment;
      const walletEntryClient = {
        type: "credit",
        amount: clientLeftoverAmount,
        from: "admin",
        fromId: adminId,
        date: new Date(),
      };

      updateClientWallet = await ClientModel.findByIdAndUpdate(
        currentContract.clientId,
        {
          $inc: { "wallet.balance": clientLeftoverAmount },
          $push: { "wallet.transactions": walletEntryClient },
        },
        {
          new: true,
          upsert: false,
        }
      ).exec();
    }

    //remove project submission from client ----------------
    const clientId = currentContract.clientId;
    const currentClient = await ClientModel.findByIdAndUpdate(
      clientId,
      {
        $pull: { projectSubmissions: { contractId: contractId } },
      },
      { new: true }
    );

    //update to user workHistory ----------------

    const updateUser = await UserModel.findByIdAndUpdate(
      currentContract.userId,
      {
        $push: {
          workHistory: {
            _id: currentJobPost._id,
            title: currentJobPost.title,
            description: currentJobPost.description,
            expertLevel: currentJobPost.expertLevel,
            location: currentJobPost.location,
            amount: currentJobPost.amount,
            paymentType: currentJobPost.paymentType,
            estimateTimeinHours: currentJobPost.estimateTimeinHours,
            projectType: currentJobPost.projectType,
            requiredSkills: currentJobPost.requiredSkills,
          },
        },
      },
      {
        new: true,
      }
    );

    const newNotificationUser = await NotificationModel.create({
      type: "contract closed",
      message: "You successfully completed a Job Contract",
      sender_id: process.env._ADMIN_OBJECT_ID,
      reciever_id: currentContract.userId,
      closeContract: {
        contractId: contractId,
      },
      createdAt: new Date(),
    });

    const newNotificationClient = await NotificationModel.create({
      type: "contract-close",
      message: "One Contract Successfully Closed",
      sender_id: process.env._ADMIN_OBJECT_ID,
      reciever_id: currentContract.clientId,
      closeContract: {
        contractId: contractId,
        userId: currentContract.userId,
      },
      createdAt: new Date(),
    });

    newNotificationUser.save();
    newNotificationClient.save();

    return {
      updateUserWallet,
      updateAdminWallet,
      updateClientWallet,
      newNotificationUser,
      newNotificationClient,
    };
  }

  async rateAndReviewUser(
    userId: Id,
    clientId: Id,
    notificationId: Id,
    rating: number,
    review: string
  ): Promise<{ updateUser: IUser; removeExtra: Notification }> {
    interface Rating {
      rating: {
        ratingSum: number;
        noOfRating: number;
      };
    }

    type RateData = Rating | null;
    const rateData: RateData = await UserModel.findById(userId);

    if (!rateData) throw new Error("User not found");

    const ratingSum: number = rateData.rating.ratingSum;
    const noOfRating: number = rateData.rating.noOfRating;
    let avgRating: number = (ratingSum + rating) / (noOfRating + 1);
    avgRating = Math.min(avgRating, 4.9);
    const finalRating: number = Math.floor(avgRating * 10) / 10;
    const reviewData = {
      theReview: review,
      rating: rating,
    };

    const client = await ClientModel.findById(clientId).lean<IClient>();
    if (!client) throw new Error("Client not found");

    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        $inc: { "rating.ratingSum": rating, "rating.noOfRating": 1 },
        "rating.avgRating": finalRating,
        $push: {
          review: {
            theReview: review,
            rating: rating,
            companyName: client.companyName,
          },
        },
      },
      { new: true }
    )
      .lean<IUser>()
      .exec();
    if (!updateUser) throw new Error("user not exists");

    const removeExtra = await NotificationModel.findByIdAndUpdate(
      notificationId,
      { extra: {} },
      { update: true }
    )
      .lean<Notification>()
      .exec();
    if (!removeExtra) throw new Error("notification not exists");

    return { updateUser, removeExtra };
  }

  async rejectContract(
    contractId: Id,
    clientId: Id
  ): Promise<IContractDocument> {
    const currentContract = await ContractModel.findById(contractId)
      .lean<IContractDocument>()
      .exec();

    if (!currentContract) throw new Error("Contract not exists");

    //admin share would be 10%
    const adminId = process.env.ADMIN_OBJECT_ID;
    const userId = currentContract.userId;

    const adminWalletDeduction = Math.floor(
      (currentContract.amount * 10) / 100
    );
    const finalAmountToAdminWallet = Math.floor(
      currentContract.amount - adminWalletDeduction
    );

    const walletEntryAdmin = {
      type: "debit",
      amount: finalAmountToAdminWallet,
      from: "admin",
      fromId: adminId,
      date: new Date(),
    };

    const adminWallet = await AdminModel.findByIdAndUpdate(
      adminId,
      {
        $inc: { "wallet.balance": -finalAmountToAdminWallet },
        $push: { "wallet.transactions": walletEntryAdmin },
      },
      {
        new: true,
      }
    );

    //usershare would be 10%
    const userShare = Math.floor((finalAmountToAdminWallet * 10) / 100);

    const walletEntryUser = {
      type: "credit",
      amount: userShare,
      from: "admin",
      fromId: adminId,
      date: new Date(),
    };

    const userWallet = await UserModel.findByIdAndUpdate(
      userId,
      {
        $inc: { "wallet.balance": userShare },
        $push: { "wallet.transactions": walletEntryUser },
      },
      {
        new: true,
      }
    );

    //rest of the amount go to client wallet
    const finalAmountToClientWallet = Math.floor(
      finalAmountToAdminWallet - userShare
    );

    const walletEntryClient = {
      type: "credit",
      amount: finalAmountToClientWallet,
      from: "admin",
      fromId: adminId,
      date: new Date(),
    };

    // final amount go to client wallet and status changed to rejected
    const updateClientWallet = await ClientModel.findByIdAndUpdate(
      clientId,
      {
        status: "rejected",
        $inc: {
          "wallet.balance": finalAmountToClientWallet,
        },
        $push: {
          "wallet.transactions": walletEntryClient,
        },
      },
      {
        new: true,
      }
    );

    const contract = await ContractModel.findByIdAndUpdate(
      contractId,
      {
        status: "rejected",
      },
      {
        new: true,
      }
    );

    if (!contract) throw new Error("Contract not found");

    // deleting the entire submission doc from client
    const updatedClient = await ClientModel.findOneAndUpdate(
      { "projectSubmissions.contractId": contractId },
      { $pull: { projectSubmissions: { contractId } } },
      { new: true }
    );

    return contract;
  }

  async searchDeveloperBySkills(input: string): Promise<IUser> {
    const developers = await UserModel.find({
      skills: { $regex: input, $options: "i" },
    })
      .lean<IUser>()
      .exec();

    if (!developers) throw new Error("No developer found");

    return developers;
  }

  async withdrawMoney(
    clientId: Id,
    amount: number,
    accountNumber: number
  ): Promise<void> {
    let userName;

    const client = await ClientModel.findById(clientId).lean<IClient>().exec();
    if (!client) throw new Error("client not exists");
    userName = client.companyName;

    const adminId: string = process.env.ADMIN_OBJECT_ID as string;
    if (!mongoose.Types.ObjectId.isValid(clientId)) {
      throw new Error("Invalid clientId: Must be a 24-character hex string.");
    }
    const withdrawRequestObject = {
      roleType: "client",
      roleId: new mongoose.Types.ObjectId(clientId),
      userName: userName,
      amount: amount,
      accountNumber: accountNumber.toString(),
      createdAt: new Date(),
    };
    const withdrawRequest = await AdminModel.findByIdAndUpdate(
      adminId,
      { $push: { withdrawRequest: withdrawRequestObject } },
      { new: true }
    );

    return;
  }
}
