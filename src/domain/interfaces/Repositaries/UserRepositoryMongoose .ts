import mongoose, { Schema, Document, Model } from "mongoose";
import { User } from "../../entities/User";
import { UserModel } from "../../entities/User";
import { Client, ClientModel } from "../../entities/Client";
import { JobPostModel } from "../../entities/JobPost";
import { UserRepositary } from "../../../application/usecases/user/signupUser";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import { ContractModel } from "../../entities/Contract";
import { AdminModel } from "../../entities/Admin";

type Id = string;

export class UserRepositoryMongoose implements UserRepositary {
  async createUser(user: User | any): Promise<User | any> {
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

  async signupUser(user: User | any): Promise<User | any> {
    if (!user.name || !user.email || !user.password) {
      throw new Error("Name, email, and password are required");
    }

    if (user.name.length < 4 || user.name.length > 20) {
      throw new Error("Name should be between 4 to 20 characters");
    }

    if (user.mobile.length < 10 || user.mobile.length > 12) {
      throw new Error("invalid Mobile Number");
    }

    if (!validator.isEmail(user.email)) {
      throw new Error("Invalid email format");
    }

    if (!validator.isStrongPassword(user.password)) {
      throw new Error("Please enter a strong password");
    }

    const foundUser: any = this.findUserByEmail(user.email);

    if (foundUser) {
      return foundUser;
    } else {
      return null;
    }
  }

  async verifyOtp(user: any): Promise<User> {
    const { name, email, password, mobile } = user.user;
    if (user.mailOtp === parseInt(user.userOtp.otp)) {
      const salt: number = 10;
      const hashedPassword = await bcrypt.hash(password, salt);

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
        rating: "",
        domain: "",
        githubLink: "",
        totalJobs: "",
        totalHours: "",
        whyHireMe: "",
        completedJobs: "",
        inProgress: "",
        workHistory: [],
        isEditRequest: false,
        request: [],
        wallet: [],
        isBlocked: false,
        isBoosted: false,
        createdAt: new Date()
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
    if (!user) {
      throw new Error("User not found");
    }

    return { user };
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

    const USER_ACCESS_TOKEN: any = process.env.USER_ACCESS_TOKEN;
    const USER_REFRESH_TOKEN: any = process.env.USER_REFRESH_TOKEN;

    const refreshToken = jwt.sign(
      { id: user._id, email: user.email },
      USER_REFRESH_TOKEN,
      { expiresIn: "7d" }
    );
    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      USER_ACCESS_TOKEN,
      { expiresIn: "15m" }
    );

    user.refreshToken = refreshToken;
    await user.save();

    return {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        mobile: user.mobile,
        description: user.description,
        location: user.locaiton,
        isBlocked: user.isBlocked,
        budget: user.budget,
        skills: user.skills,
      },
      accessToken,
      refreshToken,
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
      } as User;
    } else {
      const salt: number = 10;
      const hashedPassword = await bcrypt.hash(password, salt);

      const createdUser = new UserModel({
        name: name,
        email: email,
        password: hashedPassword,
        mobile: "",
        isBlocked: false,
        age: "",
        location: "",
        description: "",
        skills: "",
        budget: "",
      });

      const savedUser = await createdUser.save();

      return {
        name: savedUser.name,
        email: savedUser.email,
        mobile: savedUser.mobile,
      } as User;
    }
  }

  async findAllClients(): Promise<Client | any> {
    const clients: any = await ClientModel.find().limit(6).exec();
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

  async editUserProfile(userId: string, userData: any): Promise<any> {
    // const existingUser: any = await UserModel.findById(userId);

    const { editData } = userData;

    const user = await UserModel.findByIdAndUpdate(userId, editData, {
      update: true,
    }).exec();

    if (!user) throw new Error("User not found");
    return { user };
  }

  async createProposal(
    clientId: Id,
    userId: Id,
    jobPostId: Id,
    description: string
  ): Promise<any> {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const existingProposal = await ClientModel.find({
      $and: [
        { "proposals.userId": userId },
        { "proposals.jobPostId": jobPostId },
      ],
    });

    if (existingProposal.length !== 0) {
      throw new Error("Proposal alredy send");
    } else {
      const jobpost: any = await JobPostModel.findById(jobPostId);

      const newProposal = {
        type: "New Job Proposal ",
        userId: userId,
        jobPostId: jobPostId,
        jobPostInfo: jobpost.title,
        userData: user,
        description: description,
      };
      //  const proposal = await ClientModel.findById(clientId)

      const proposal = await ClientModel.findByIdAndUpdate(
        clientId,
        { $push: { proposals: newProposal } },
        { new: true }
      );

      return proposal;
    }
  }

  async findAllJobs(): Promise<any> {
    const allJobs = await JobPostModel.find({ status: "pending" }).exec();

    if (!allJobs) {
      throw new Error("No job found");
    } else {
      return allJobs;
    }
  }

  async allContracts(userId: Id): Promise<any> {
    const contract = await ContractModel.find({ userId: userId }).exec();

    if (!contract) {
      throw new Error("Contract not found");
    } else {
      return contract;
    }
  }

  async allNotifications(userId: Id): Promise<any> {
    const user: any = await UserModel.findById(userId).exec();

    if (!user) {
      throw new Error("User not found");
    } else {
      return user?.request;
    }
  }

  async bestMatches(userId: string): Promise<any> {
    const user: any = await UserModel.findById(userId).exec();

    if (!user || !user.skills || user.skills.length === 0) {
      throw new Error("User has no skills or does not exist.");
    }

    const userSkills = user.skills;

    const matchJobs = await JobPostModel.find({
      requiredSkills: { $elemMatch: { $in: userSkills } },
    }).exec();

    if (!matchJobs || matchJobs.length === 0) {
      throw new Error("No matched job found ");
    } else {
      return matchJobs;
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

    currentContract.active = false;
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

  async viewContract(contractId: Id): Promise<any> {
    const contract: any = await ContractModel.findById(contractId);

    if (!contract) {
      throw new Error("contract not found");
    } else {
      return contract;
    }
  }

  async bosstSuccess(userId: Id): Promise<any> {
    const user: any = await UserModel.findByIdAndUpdate(
      userId,
      {
        isBoosted: true,
      },
      {
        update: true,
      }
    );

    if (!user) {
      throw new Error("User not found");
    } else {
      return user?.request;
    }
  }
}
