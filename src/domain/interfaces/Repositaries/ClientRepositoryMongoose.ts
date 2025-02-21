import { Client, ClientModel } from "../../entities/Client";
import { User } from "../../entities/User";
import { ClientRepositary } from "../../../application/usecases/client/signupClient";
import { UserModel } from "../../entities/User";
import { NotificationModel } from "../../entities/Notification";
import { JobPostModel } from "../../entities/JobPost";
import { AdminModel } from "../../entities/Admin";
import { ContractModel } from "../../entities/Contract";
import bcrypt from "bcrypt";
import validator from "validator";
import allCronJobs from "../../../helper/cron-jobs/index";
import mongoose from "mongoose";
import { InviteModel } from "../../entities/Invite";

export interface Notification {
  type: string;
  message: string;
  sender_id: string;
  reciever_id: string;
  extra: Extra;
  createdAt: string;
}

export interface Extra {
  userId: string;
}

interface Invite {
  clientId?: mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId;
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

export class ClientRepositoryMongoose implements ClientRepositary {
  async createClient(client: Client | any): Promise<Client | any> {
    const salt: number = 10;
    const hashedPassword = await bcrypt.hash(client.password, salt);

    const createdClient = new ClientModel({
      name: client.name,
      email: client.email,
      password: hashedPassword,
    });

    const savedClient = await createdClient.save();

    return {
      name: savedClient.name,
      email: savedClient.email,
      password: savedClient.password,
    } as unknown as Client;
  }

  async signupClient(client: Client | any): Promise<Client | any> {
    const foundClient: any = this.findClientByEmail(client.email);
    if (!foundClient) throw new Error("Client Not Found");

    return foundClient;
  }

  async verifyOtp(client: any): Promise<Client> {
    const { name, email, password } = client.user.data;

    if (client.mailOtp === parseInt(client.user.otp)) {
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
        totalJobs: "",
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
      } as Client;
    } else {
      throw new Error("incorrect OTP");
    }
  }

  async findClientByEmail(email: string): Promise<Client | null> {
    const client = await ClientModel.findOne({ email }).exec();

    if (!client) {
      return null;
    } else {
      return {
        _id: client._id,
        companyName: client.companyName,
        email: client.email,
        password: client.password,
      } as Client;
    }
  }

  async findClientByEmailAndPassword(
    email: string,
    password: string
  ): Promise<Client | any> {
    if (!email || !password) {
      throw new Error("Email, and password are required");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Invalid email format");
    }

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

    await client.save();

    return client;
  }

  async findClientByOnlyEmail(
    email: string,
    name: string
  ): Promise<Client | null> {
    const client = await ClientModel.findOne({ email }).exec();
    if (client) {
      return {
        companyName: client.companyName,
        email: client.email,
      } as Client;
    } else {
      const createdClient = new ClientModel({
        name: name,
        email: email,
      });

      const savedClient = await createdClient.save();

      return {
        companyName: savedClient.companyName,
        email: savedClient.email,
      } as Client;
    }
  }

  async findAllUsers(): Promise<User | any> {
    const users: any = await UserModel.find().limit(4).exec();
    if (users) {
      return {
        ...users,
      } as User;
    }
  }

  async resetPassword(clientId: string, password: string): Promise<User | any> {
    const pass = { password: password };

    const updatedClient = await ClientModel.findByIdAndUpdate(clientId, pass, {
      new: true,
    }).exec();

    if (!updatedClient) {
      throw new Error("Client not found or password update failed.");
    }
    return "Password reset successfully!";
  }

  async getClientProfile(clientId: string): Promise<any> {
    const client = await ClientModel.findById(clientId);

    if (!client) {
      throw new Error("Client not found");
    }

    return client;
  }

  async profileVerification(clientId: any, data: any): Promise<any> {
    const adminId = process.env.ADMIN_OBJECT_ID;
    const existingClient: any = await ClientModel.findById(clientId);

    if (existingClient.isEditRequest) {
      throw new Error("Request already sended");
    }

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
    );

    const editclientRequest = await ClientModel.findByIdAndUpdate(
      clientId,
      { isEditRequest: true },
      { update: true }
    );

    return updatedAdmin;
  }

  async editClientProfile(clientId: string, editData: any): Promise<any> {
    const adminId = process.env.ADMIN_OBJECT_ID;
    const existingClient: any = await ClientModel.findById(clientId);

    if (existingClient.isEditRequest) {
      throw new Error("Request already sended");
    }

    const request = {
      type: "Profile Updation Request",
      clientId: clientId,
      status: "pending",
      data: editData,
    };

    const updatedAdmin = await AdminModel.findByIdAndUpdate(
      adminId,
      { $push: { request: request } },
      { new: true }
    );

    const editclientRequest = await ClientModel.findByIdAndUpdate(
      clientId,
      { isEditRequest: true },
      { update: true }
    );

    return updatedAdmin;
  }

  async createJobPost(clientId: string, data: any): Promise<any> {
    const client: any = await ClientModel.findById(clientId);

    const parsedEstimatedTimeInHours = parseInt(data.estimateTime);

    const totalAmount = data.estimateTime * data.payment;

    data.amount = totalAmount; //updatig the total amount

    const createdJobPost = new JobPostModel({
      title: data.title,
      description: data.description,
      keyResponsiblities: data.keyResponsiblities,
      requiredSkills: data.requiredSkills,
      paymentType: data.paymentType,
      estimateTime: new Date(),
      estimateTimeinHours: parsedEstimatedTimeInHours,
      amount: data.payment,
      expertLevel: data.expertLevel,
      location: data.location,
      projectType: data.projectType,
      maxProposals: data.maxProposals,
      proposalCount: 0,
      aboutClient: {
        companyName: client.companyName,
        location: client.location,
        totalSpend: client.totalSpend,
        totalHours: client.totalHours,
        domain: client.domain,
        numberOfEmployees: client.numberOfEmployees,
        joined: client.createdAt,
      },
      status: "pending",
      isPayment: true,
      createdAt: new Date(),
      clientId: clientId,
    });

    const savedJobPost = await createdJobPost.save();

    const newNotification = await NotificationModel.create({
      type: "New Job Post",
      message: "New Post created successfully",
      sender_id: process.env._ADMIN_OBJECT_ID,
      reciever_id: clientId,
      createdAt: new Date(),
    });

    newNotification.save();

    return { savedJobPost };
  }

  async getAllNotifications(clientId: any): Promise<any> {
    const notifications = await NotificationModel.aggregate([
      {
        $match: { reciever_id: clientId },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    if (!notifications) {
      throw new Error("No notification found");
    } else {
      return notifications;
    }
  }

  async findAllJobs(): Promise<any> {
    const allJobs = await JobPostModel.find().exec();

    if (!allJobs) {
      throw new Error("No job found");
    } else {
      return allJobs;
    }
  }

  async getUserProfile(userId: string): Promise<any> {
    const user = await UserModel.findById(userId).exec();

    if (!user) {
      throw new Error("User not found");
    } else {
      const userProfile = {
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
        githubLink: user.githubLinke,
        whyHireMe: user.whyHireMe,
        education: user.education,
        completedJobs: user.completedJobs,
        inProgress: user.inProgress,
        workHistory: user.workHistory,
      };

      return userProfile;
    }
  }

  async getProposals(clientId: string): Promise<any> {
    const client: any = await ClientModel.findById(clientId);
    if (!client) {
      throw new Error("Client not found");
    }

    const proposals = client.proposals;

    return proposals;
  }

  async getallDevelopers(): Promise<any> {
    //  const developers = await UserModel.find({isProfileFilled: true}).exec();
    const developers = await UserModel.find({ isProfileFilled: true }).exec();

    if (!developers) throw new Error("Developers not found");

    return developers;
  }

  async viewContract(contractId: string): Promise<any> {
    const contract: any = await ContractModel.findById(contractId);
    if (!contract) {
      throw new Error("contract not found");
    }

    return contract;
  }

  async viewWallet(clientId: string, page: number): Promise<any> {
    const PAGE_SIZE: number = 4;
    const skip: number = (page - 1) * PAGE_SIZE;

    const wallet = await ClientModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(clientId) } },
      { $project: { totalTransactions: { $size: "$wallet.transactions" } } },
    ]);

    const totalTransactions =
      wallet.length > 0 ? wallet[0].totalTransactions : 0;
    const totalPages: number = totalTransactions / PAGE_SIZE;

    const clientWallet = await ClientModel.aggregate([
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
      ...clientWallet,
      totalPages,
    };
  }

  async addMoneyToAdminWallet(
    role: string,
    roleId: any,
    amount: number
  ): Promise<any> {
    const adminId = process.env.ADMIN_OBJECT_ID;
    const admin: any = await AdminModel.findById(adminId);

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

  async getMyJobs(clientId: string): Promise<any> {
    const jobs: any = await JobPostModel.find({ clientId: clientId });
    if (!jobs) {
      throw new Error("No job found");
    }

    return jobs;
  }

  async latestJobs(): Promise<any> {
    const jobs: any = await JobPostModel.find().sort({ date: "desc" });
    if (!jobs) {
      throw new Error("No job found");
    }
    return jobs;
  }

  async myContracts(clientId: string): Promise<any> {
    const jobs: any = await ContractModel.find({
      $and: [{ clientId: clientId }, { status: "on progress" }],
    }).exec();

    if (!jobs) {
      throw new Error("No job found");
    }
    return jobs;
  }

  async viewSubmissions(clientId: string): Promise<any> {
    const client: any = await ClientModel.findById(clientId).exec();

    if (!client) throw new Error("Client not found");

    return client.projectSubmissions;
  }

  async createContract(
    clientId: string,
    userId: string,
    jobPostId: string,
    bidAmount: number,
    bidDeadline: string
  ): Promise<any> {
    // updating job post status
    const currentJobPost: any = await JobPostModel.findByIdAndUpdate(
      jobPostId,
      {
        status: "on progress",
      },
      {
        update: true,
      }
    ).exec();

    const currentClient: any = await ClientModel.findById(clientId).exec();

    const currentUser: any = await UserModel.findById(userId).exec();

    // reomove all the proposals for this jobpost
    const client = await ClientModel.findByIdAndUpdate(
      clientId,
      { $pull: { proposals: { jobPostId: jobPostId } } },
      { new: true }
    );

    // send notification to rejectd and accepted user
    //  const notification = new NotificationModel({

    //  })

    // const deduction = currentJobPost.amount % 10;

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

    const timer = currentJobPost.estimateTimeinHours;
    const contractId: any = savedContract._id;
    const adminId = process.env.ADMIN_OBJECT_ID;

    const newNotificationUser = await NotificationModel.create<Notification>({
      type: "Contract",
      message: "New Contract signed in",
      sender_id: adminId,
      reciever_id: userId,
      "extra.documentId": contractId,
      createdAt: new Date(),
    });

    const newNotificationClient = await NotificationModel.create<Notification>({
      type: "Contract",
      message: "New Contract signed in",
      sender_id: adminId,
      reciever_id: clientId,
      "extra.documentId": contractId,
      createdAt: new Date(),
    });

    newNotificationUser.save();
    newNotificationClient.save();

    //await allCronJobs.startContractHelperFn(timer, jobPostId, userId, contractId);

    return {
      newNotificationUser,
      newNotificationClient,
    };
  }

  async rejectProposal(
    clientId: any,
    userId: any,
    jobPostId: any
  ): Promise<any> {
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
        $set: { "proposals.$.status": "rejected" }, // Update only the matched proposal ----------------
      },
      { new: true }
    );
    return proposal;
  }

  async closeContract(contractId: string, progress: number): Promise<any> {
    //update contract status as closed ----------------
    if (!progress) throw new Error("Progress data missing");

    const currentContract: any = await ContractModel.findByIdAndUpdate(
      contractId,
      {
        active: false,
        status: "closed",
      },
      { update: true }
    );

    if (!currentContract) {
      throw new Error("Contract not found");
    }

    //update jobpost status as closed ----------------
    const jobPostId: string = currentContract.jobPostId;

    const currentJobPost: any = await JobPostModel.findByIdAndUpdate(
      jobPostId,
      {
        status: "closed",
      },
      { update: true }
    );

    const finalAmount = Math.round(
      currentContract.amount - (currentContract.amount * 10) / 100
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
        $inc: { "wallet.balance": -finalAmount },
        $push: { "wallet.transactions": walletEntryAdmin },
      },
      {
        new: true,
        upsert: false,
      }
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
        $push: { workHistory: jobPostId },
      },
      {
        update: true,
      }
    );

    const newNotificationUser = await NotificationModel.create({
      type: "contract close",
      message: "You successfully completed a Job Contract",
      sender_id: process.env._ADMIN_OBJECT_ID,
      reciever_id: currentContract.userId,
      extra: {
        documentId: contractId,
      },
      createdAt: new Date(),
    });

    const newNotificationClient = await NotificationModel.create({
      type: "contract-close",
      message: "One Contract Successfully Closed",
      sender_id: process.env._ADMIN_OBJECT_ID,
      reciever_id: currentContract.clientId,
      extra: {
        documentId: currentContract.userId,
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
    userId: string,
    clientId: string,
    notificationId: string,
    rating: number,
    review: string
  ): Promise<any> {
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

    const client: any = await ClientModel.findById(clientId);

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
    );

    const removeExtra = await NotificationModel.findByIdAndUpdate(
      notificationId,
      { extra: {} },
      { update: true }
    );

    return { updateUser, removeExtra };
  }

  async inviteUser(
    userId: string,
    clientId: string,
    jobPostId: string,
    description: string
  ): Promise<Invite> {
    const jobPostData: any = await JobPostModel.findById(jobPostId);
    const client: any = await ClientModel.findById(clientId);

    const inviteFn = new InviteModel({
      clientId,
      userId,
      description,
      jobPostData: {
        title: jobPostData.title,
        description: jobPostData.description,
        expertLevel: jobPostData.expertLevel,
        location: jobPostData.location,
        requiredSkills: jobPostData.requiredSkills,
        amount: jobPostData.amount,
        paymentType: jobPostData.paymentType,
        estimateTimeinHours: jobPostData.estimateTimeinHours,
        projectType: jobPostData.projectType,
      },
      clientData: {
        companyName: client.companyName,
        email: client.email,
        location: client.location,
      },
      state: "pending",
      createdAt: new Date(),
    });

    const savedInvite = await inviteFn.save();

    return savedInvite;
  }
}
