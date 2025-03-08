import bcrypt from "bcrypt";
import validator from "validator";
import { UserModel } from "../../entities/User";
import { Client, ClientModel } from "../../entities/Client";
import { JobPostDocument, JobPostModel } from "../../entities/JobPost";
import { UserRepositary } from "../../../application/usecases/user/signupUser";
import { ContractDocument, ContractModel } from "../../entities/Contract";
import { AdminModel } from "../../entities/Admin";
import { NotificationModel } from "../../entities/Notification";
import mongoose, { isObjectIdOrHexString } from "mongoose";
import { InviteModel } from "../../entities/Invite";
import { WishlistModel } from "../../entities/WIshlist";

type Id = string;

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  mobile: number;
  skills: string[];
  profilePicture: string;
  location: string;
  description: string;
  experience: string;
  education: string;
  budget: number;
  rating: number;
  domain: string;
  githubLink: string;
  totalJobs: number;
  totalHours: number;
  whyHireMe: string;
  completedJobs: string;
  inProgress: string;
  workHistory: string[];
  isEditRequest: boolean;
  isProfileFilled: boolean;
  request: string[];
  wallet: string[];
  isBlocked: boolean;
  isBoosted: boolean;
  createdAt: string;
}

interface Invite {
  clientId?: mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId;
  jobPostData?: {
    title: string;
    description: string;
    expertLevel: "beginner" | "intermediate" | "advanced";
    location: string;
    requiredSkills: string[];
    amount: number;
    paymentType: "hourly" | "fixed";
    estimateTimeinHours: Number;
    projectType: "ongoing project" | "project updation";
  };
  status: "pending" | "rejected";
  createdAt: Date;
}

export class UserRepositoryMongoose implements UserRepositary {
  async createUser(user: User): Promise<User> {
    const salt: number = parseInt(process.env.BCRYPT_SALT as string);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const createdUser = new UserModel({
      name: user.name,
      email: user.email,
      password: hashedPassword,
      mobile: user.mobile,
      isBlocked: false,
    });

    const savedUser = await createdUser.save();

    return {
      name: savedUser.name,
      email: savedUser.email,
      password: savedUser.password,
      mobile: savedUser.mobile,
      isBlocked: false,
    } as User;
  }

  async signupUser(email: string): Promise<User | null> {
    const foundUser = this.findUserByEmail(email);
    if (!foundUser) throw new Error("User Not found");

    return foundUser;
  }

  async verifyOtp(user: any): Promise<User> {
    const {
      name,
      email,
      password,
      mobile,
    }: { name: string; email: string; password: string; mobile: number } =
      user.user.data;

    if (user.mailOtp === parseInt(user.mailOtp)) {
      const salt: number = 10;
      const hashedPassword: string = await bcrypt.hash(password, salt);

      const createdUser = new UserModel({
        name: name,
        email: email,
        password: hashedPassword,
        mobile: mobile,
        skills: "",
        profilePicture: "",
        location: "",
        description: "",
        experience: "",
        education: "",
        budget: "",
        rating: {
          ratingSum: 0,
          noOfRating: 0,
          avgRating: 0,
        },
        review: [],
        domain: "",
        githubLink: "",
        totalJobs: "",
        totalHours: "",
        whyHireMe: "",
        completedJobs: "",
        inProgress: "",
        workHistory: [],
        isEditRequest: false,
        isProfileFilled: false,
        request: [],
        wallet: [],
        isBlocked: false,
        isBoosted: false,
        createdAt: new Date(),
      });

      const savedUser = await createdUser.save();

      return {
        name: savedUser.name,
        email: savedUser.email,
        mobile: savedUser.mobile,
      } as User;
    } else {
      throw new Error("incorrect OTP");
    }
  }

  async findUserById(_id: string): Promise<any | null> {
    const user = await UserModel.findById(_id);
    if (!user) throw new Error("User not found");
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email }).exec();
    if (!user) {
      return null;
    } else {
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        mobile: user.mobile,
      } as User;
    }
  }

  async findUserByEmailAndPassword(
    email: string,
    passwordUser: string
  ): Promise<User | any> {
    if (!email || !passwordUser) {
      throw new Error("Email, and password are required");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Invalid email format");
    }

    const user = await UserModel.findOne({ email }).exec();

    if (!user) {
      throw new Error("User not Found");
    }

    if (user.isBlocked) {
      throw new Error("User not Authenticated");
    }

    if (!user.password) {
      throw new Error("Password is wrong");
    }

    const { password }: any = user;
    const isValidPassword = await bcrypt.compare(passwordUser, password);

    if (!isValidPassword) {
      throw new Error("wrong password");
    }

    return {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        isBlocked: user.isBlocked,
        isProfileFilled: user.isProfileFilled,
      },
    };
  }

  async findUserByOnlyEmail(
    email: string,
    name: string,
    password: any
  ): Promise<any | null> {
    const user = await UserModel.findOne({ email }).exec();

    if (user) {
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        isBlocked: user.isBlocked,
        isProfileFilled: user.isProfileFilled,
      } as User;
    } else {
      const salt: number = 10;
      const hashedPassword = await bcrypt.hash(password, salt);

      const createdUser = new UserModel({
        name: name,
        email: email,
        password: hashedPassword,
        mobile: 0,
        skills: "",
        profilePicture: "",
        location: "",
        description: "",
        experience: "",
        education: "",
        budget: "",
        rating: {
          ratingSum: 0,
          noOfRating: 0,
          avgRating: 0,
        },
        review: [],
        domain: "",
        githubLink: "",
        totalJobs: "",
        totalHours: "",
        whyHireMe: "",
        completedJobs: "",
        inProgress: "",
        workHistory: [],
        isEditRequest: false,
        isProfileFilled: false,
        request: [],
        wallet: [],
        isBlocked: false,
        isBoosted: false,
        createdAt: new Date(),
      });

      const savedUser = await createdUser.save();

      return {
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        mobile: savedUser.mobile,
      } as User;
    }
  }

  async findAllClients(): Promise<Client | any> {
    const clients: any = await ClientModel.find({ isVerified: true })
      .limit(3)
      .exec();
    if (clients) {
      return {
        ...clients,
      } as Client;
    }
  }

  async resetPassword(userId: string, password: string): Promise<User | any> {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { password: password },
      { new: true }
    ).exec();

    if (!updatedUser) {
      throw new Error("User not found or password update failed.");
    }

    return "Password reset successfully!";
  }

  async alterUserProfile(
    userId: string,
    userData: any,
    type: string
  ): Promise<any> {
    const { editData } = userData;
    editData.isProfileFilled = true;
    if (type === "verify") {
      const user = await UserModel.findByIdAndUpdate(userId, editData, {
        new: true,
      }).exec();

      if (!user) throw new Error("User not found");
      return {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          profilePicture: user.profilePicture,
          isBlocked: user.isBlocked,
          isProfileFilled: user.isProfileFilled,
        },
      };
    } else {
      const user = await UserModel.findByIdAndUpdate(userId, editData, {
        new: true,
      }).exec();

      if (!user) throw new Error("User not found");

      return {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          profilePicture: user.profilePicture,
          isBlocked: user.isBlocked,
          isProfileFilled: user.isProfileFilled,
        },
      };
    }
  }

  async viewProposals(userId: string): Promise<any> {
    let findProposals = await ClientModel.find({
      $and: [
        {
          proposals: { $elemMatch: { userId } },
        },
      ],
    }).exec();

    if (!findProposals) throw new Error("No proposal found");
    return findProposals[0].proposals;
  }

  async createProposal(
    userId: Id,
    jobPostId: Id,
    description: Id,
    bidAmount: number,
    bidDeadline: number
  ): Promise<any> {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    //REMOVE INVITE DOC IF EXISTS

    const existingProposal = await ClientModel.find({
      $and: [
        { "proposals.userId": userId },
        { "proposals.jobPostId": jobPostId },
      ],
    });

    if (existingProposal.length !== 0) {
      throw new Error("Proposal alredy send");
    } else {
      const jobpost: any = await JobPostModel.findByIdAndUpdate(
        jobPostId,
        {
          $inc: { proposalCount: 1 },
        },
        {
          new: true,
        }
      ); 

      // deletes invite doc if exists
      const clearInvite = await InviteModel.deleteOne({ jobPostId: jobPostId });

      const newProposal = {
        type: "New Job Proposal ",
        userId: userId,
        userData: {
          profilePicture: user.profilePicture,
        },
        jobPostId: jobPostId,
        jobPostInfo: jobpost.title,
        description: description,
        status: "pending",
        bidAmount: bidAmount,
        bidDeadline: bidDeadline,
        createdAt: new Date(),
      };

      const proposal = await ClientModel.findByIdAndUpdate(
        jobpost.clientId,
        { $push: { proposals: newProposal } },
        { new: true }
      );

      const newNotificationUser = await NotificationModel.create({
        type: "New Job Proposal",
        message: "New Proposal send successfully",
        sender_id: userId,
        reciever_id: userId,
        createdAt: new Date(),
      });

      //send to client
      const newNotificationClient = await NotificationModel.create({
        type: "New Job Proposal",
        message: "New Job Proposal Received",
        sender_id: userId,
        reciever_id: jobpost.clientId,
        createdAt: new Date(),
      });

      newNotificationUser.save();
      newNotificationClient.save();

      return { proposal, notification: newNotificationUser };
    }
  }

  async listHomeJobs(type: string): Promise<any> {
    if (type === "listAllJobs") {
      const totalJobs = await JobPostModel.countDocuments();

      const verifiedAccounts = await ClientModel.countDocuments({
        isVerified: true,
      });

      const allJobs = await JobPostModel.find({ status: "pending" })
        .limit(3)
        .exec();

      const totalHours = await JobPostModel.aggregate([
        { $group: { _id: null, sum: { $sum: "$estimateTimeinHours" } } },
      ]);

      if (!allJobs) {
        throw new Error("No job found");
      } else {
        return { allJobs, totalJobs, totalHours, verifiedAccounts };
      }
    } else if (type === "latestJobs") {
      const latestJobs = await JobPostModel.find({})
        .sort({ createdAt: -1 })
        .limit(3)
        .exec();

      return latestJobs;
    } else {
      throw new Error("Jobs not founded");
    }
  }

  async allNotifications(userId: Id): Promise<any> {
    const notifications: any = await NotificationModel.find({
      reciever_id: userId,
    })
      .sort({ createdAt: -1 })
      .exec();

    return notifications;
  }

  async getSelectedJobs(
    userId: string,
    jobType: string,
    currentPage: number
  ): Promise<JobPostDocument | any> {
    const page_size: number = 5;
    const skip: number = (currentPage - 1) * page_size;

    const user: any = await UserModel.findById(userId).exec();
    let totalPages: number;

    if (!user || !user.skills || user.skills.length === 0)
      throw new Error("User has no skills or does not exist.");

    if (jobType === "listAllJobs") {
      const totalJobs = await JobPostModel.countDocuments();

      totalPages = Math.ceil(totalJobs / page_size);
      const jobs = await JobPostModel.find({ status: "pending" })
        .skip(skip)
        .limit(page_size);

      if (!jobs) throw new Error("No jobs found");

      return {
        jobs,
        totalPages,
      };
    } else if (jobType === "trendingJobs") {
      const totalJobs = await JobPostModel.countDocuments();
      totalPages = Math.ceil(totalJobs / page_size);
      const jobs = await JobPostModel.find({ status: "pending" })
        .sort({
          proposalCount: -1,
        })
        .skip(skip)
        .limit(page_size);
      if (!jobs) throw new Error("No jobs found");

      return {
        jobs,
        totalPages,
      };
    } else if (jobType === "bestMatches") {
      const userSkills = user.skills;

      const totalJobs = await JobPostModel.countDocuments({
        $and: [
          { status: "pending" },
          { requiredSkills: { $elemMatch: { $in: userSkills } } },
        ],
      });
      totalPages = Math.ceil(totalJobs / page_size);
      const jobs = await JobPostModel.find({
        $and: [
          { status: "pending" },
          { requiredSkills: { $elemMatch: { $in: userSkills } } },
        ],
      })
        .skip(skip)
        .limit(page_size);

      if (!jobs || jobs.length === 0) throw new Error("No matched job found ");

      return {
        jobs,
        totalPages,
      };
    } else {
      throw new Error("Invalid selection");
    }
  }

  async closeContract(
    contractId: string,
    description: string,
    progress: any
  ): Promise<any> {
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

    const finalAmount = Math.round(
      currentContract.amount - (currentContract.amount * 10) / 100
    );

    const adminId = process.env.ADMIN_OBJECT_ID;
    const walletEntryUser = {
      type: "credit",
      amount: finalAmount,
      from: "admin",
      fromId: adminId,
      date: new Date(),
    };

    const updateUserWallet = await UserModel.findByIdAndUpdate(
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

    const walletEntryAdmin = {
      type: "debit",
      amount: finalAmount,
      from: "admin",
      fromId: process.env.ADMIN_OBJECT_ID,
      date: new Date(),
    };

    const updateAdminWallet = await AdminModel.findByIdAndUpdate(
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

    return { updateUserWallet, updateAdminWallet };
  }

  async viewSingleContract(contractId: Id): Promise<any> {
    const contract: any = await ContractModel.findById(contractId);

    if (!contract) {
      throw new Error("contract not found");
    } else {
      return contract;
    }
  }

  async viewContracts(
    userId: Id,
    contractViewType: string,
    currentPage: number
  ): Promise<ContractDocument | any> {
    const page_size: number = 3;
    const skip: number = (currentPage - 1) * page_size;

    let contract, totalContracts;
    if (contractViewType === "pending") {
      totalContracts = await ContractModel.countDocuments({
        $and: [{ userId: userId }, { status: "on progress" }],
      });
      contract = await ContractModel.find({
        $and: [{ userId: userId }, { status: "on progress" }],
      })
        .skip(skip)
        .limit(page_size);
    } else if (contractViewType === "submitted") {
      totalContracts = await ContractModel.countDocuments({
        $and: [{ userId: userId }, { status: "submitted" }],
      });

      contract = await ContractModel.find({
        $and: [{ userId: userId }, { status: "submitted" }],
      })
        .skip(skip)
        .limit(page_size);
    } else if (contractViewType === "rejected") {
      totalContracts = await ContractModel.countDocuments({
        $and: [{ userId: userId }, { status: "rejected" }],
      });

      contract = await ContractModel.find({
        $and: [{ userId: userId }, { status: "rejected" }],
      })
        .skip(skip)
        .limit(page_size);
    } else if (contractViewType === "completed") {
      totalContracts = await ContractModel.countDocuments({
        $and: [{ userId: userId }, { status: "closed" }],
      });

      contract = await ContractModel.find({
        $and: [{ userId: userId }, { status: "closed" }],
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

  async boostSuccess(userId: Id): Promise<any> {
    const user: any = await UserModel.findByIdAndUpdate(
      userId,
      {
        isBoosted: true,
      },
      {
        new: true,
      }
    );

    if (!user) {
      throw new Error("User not found");
    } else {
      return user?.request;
    }
  }

  async getSingleJobPost(jobPostId: string): Promise<any> {
    const jobPost = await JobPostModel.findById(jobPostId).exec();

    if (!jobPost) throw new Error("Job Post didnt found");

    return jobPost;
  }

  async submitProject(contractId: string, body: any): Promise<any> {
    const contract: any = await ContractModel.findByIdAndUpdate(
      contractId,
      {
        status: "submitted",
      },
      {
        update: true,
      }
    );

    const clientId = contract.clientId;
    const jobPostId = contract.jobPostId;

    const jobPost: any = await JobPostModel.findById(jobPostId).exec();

    const submissionBody = {
      contractId: contractId,
      description: body.description,
      progress: body.progress,
      attachedFile: body.attachedFile,
      jobPostData: {
        jobPostId: jobPost._id,
        title: jobPost.title,
        amount: jobPost.amount,
      },
      createdAt: new Date(),
    };

    const addRequestToClient = await ClientModel.findByIdAndUpdate(
      clientId,
      {
        $push: { projectSubmissions: submissionBody },
      },
      {
        new: true,
      }
    );

    return addRequestToClient;
  }

  async viewWallet(userId: string, currentPage: number): Promise<any> {
    const page_size: number = 4;
    const skip: number = (currentPage - 1) * page_size;

    const wallet = await UserModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
      { $project: { totalTransactions: { $size: "$wallet.transactions" } } },
    ]);

    const totalTransactions =
      wallet.length > 0 ? wallet[0].totalTransactions : 0;
    const totalPages: number = Math.ceil(totalTransactions / page_size);

    const userWallet = await UserModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
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
      ...userWallet,
      totalPages,
    };
  }

  async getAllInvites(userId: string): Promise<Invite | any> {
    const foundedInvites = await InviteModel.find({ userId: userId });

    if (!foundedInvites) throw new Error("Invite not Found");
    return foundedInvites;
  };


  async rejectInvite(inviteId: string): Promise<Invite | any> {
    const updateInvite = await InviteModel.updateOne(
      { _id: inviteId },
      {
        status: "rejected",
      },
      {
        new: true,
      }
    );

    if (!updateInvite) throw new Error("Invite not Found");

    return updateInvite;
  }

  async withdrawMoney(userId: Id, amount: number, accountNumber: number, type: string): Promise<Invite | any> {
    let userName: string; 
    if(type === 'user') { 
        const user: any = await UserModel.findById(userId).exec();
        userName = user.name; 
    } else {
      const client: any = await ClientModel.findById(userId).exec();
      userName= client.companyName;
    } 

    const adminId: string = process.env.ADMIN_OBJECT_ID as string;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid userId: Must be a 24-character hex string.");
  }
    const withdrawRequestObject = {
      roleId: new mongoose.Types.ObjectId(userId), 
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
 

    return

  }
}
