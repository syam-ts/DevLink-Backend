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

type Id = string;

interface User {
  
  role?: string;
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
  review?: [
    {
      theReview: string;
      rating: number;
      companyName: string;
    }
  ];
  workHistory: string[];
  isEditRequest: boolean;
  isProfileFilled: boolean;
  request: string[];
  wallet: string[];
  isBlocked: boolean;
  isBoosted: boolean;
  createdAt: string;
  [key: string]: string[] | number | string | boolean | Object | undefined
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
};

interface Wallet {
  balance: number,
  transactions: {
    type: string
    amount: number
    from: string
    fromId: string
    createdAt: Date
  }
};

interface Proposal {
  type: string,
  UserId: mongoose.Types.ObjectId,
  jobPostId: mongoose.Types.ObjectId,
  jobPostInfo: string,
  userData: User,
  description?: string,
  status?: string,
  bidamount: number,
  bidDeadline: number,
  createdAt: Date
};

export class UserRepositoryMongoose implements UserRepositary {

  async createUser(user: User): Promise<User> {
    const salt: number = parseInt(process.env.BCRYPT_SALT as string, 10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const createdUser = new UserModel({
      name: user.name,
      email: user.email,
      password: hashedPassword,
      mobile: user.mobile,
      role: user.role ?? "user",
      skills: user.skills ?? [],
      profilePicture: user.profilePicture ?? "",
      location: user.location ?? "",
      description: user.description ?? "",
      experience: user.experience ?? "",
      education: user.education ?? "",
      budget: user.budget ?? 0,
      rating: user.rating ?? 0,
      domain: user.domain ?? "",
      githubLink: user.githubLink ?? "",
      totalJobs: user.totalJobs ?? 0,
      totalHours: user.totalHours ?? 0,
      whyHireMe: user.whyHireMe ?? "",
      completedJobs: user.completedJobs ?? "",
      inProgress: user.inProgress ?? "",
      workHistory: user.workHistory ?? [],
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
      password: savedUser.password,
      mobile: savedUser.mobile,
      role: savedUser.role,
      skills: savedUser.skills,
      profilePicture: savedUser.profilePicture,
      location: savedUser.location,
      description: savedUser.description,
      experience: savedUser.experience,
      education: savedUser.education,
      budget: savedUser.budget,
      rating: savedUser.rating,
      domain: savedUser.domain,
      githubLink: savedUser.githubLink,
      totalJobs: savedUser.totalJobs,
      totalHours: savedUser.totalHours,
      whyHireMe: savedUser.whyHireMe,
      completedJobs: savedUser.completedJobs,
      inProgress: savedUser.inProgress,
      workHistory: savedUser.workHistory,
      isEditRequest: savedUser.isEditRequest,
      isProfileFilled: savedUser.isProfileFilled,
      request: savedUser.request,
      wallet: savedUser.wallet,
      isBlocked: savedUser.isBlocked,
      isBoosted: savedUser.isBoosted,
      createdAt: savedUser.createdAt,
    } as User;
  }


  async signupUser(email: string): Promise<User | null> { 
    const foundUser = this.findUserByEmail(email); 
    if (!foundUser) throw new Error("User Not found");

    return foundUser;
  }

  async verifyOtp(user: {
    mailOtp: string;
    userOtp: string;
    user: {
      data: {
        name: string;
        email: string;
        password: string;
        mobile: number
      };
    };
  }): Promise<User> {
    const {
      name,
      email,
      password,
      mobile,
    } =
      user.user.data;
      
    if (Number(user.mailOtp) == Number(user.userOtp)) {
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

  async findUserById(userId: string): Promise<User> {
    const user = await UserModel.findById(userId).lean<User>().exec();
    if (!user) throw new Error("User not found");
    return user as User;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email }).lean<User>().exec();
    if (!user) {
      return null
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
  ): Promise<User> { 
    const user = await UserModel.findOne({ email }).lean<User>().exec(); 
    if (!user) throw new Error("User not Found");
    if (user.isBlocked) throw new Error("User not Authenticated"); 

    const { password } = user; 
    const isValidPassword = await bcrypt.compare(passwordUser, password);
 
    if (!isValidPassword) {
      throw new Error("wrong password");
    }  

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      isBlocked: user.isBlocked,
      isProfileFilled: user.isProfileFilled,
    } as User;
  }

  async findUserByOnlyEmail(
    email: string,
    name: string,
    password: string
  ): Promise<User> {
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

  async findAllClients(): Promise<Client[]> {
    const clients = await ClientModel.find({ isVerified: true })
      .limit(3)
      .lean<Client[]>()
      .exec();
    if (!clients) throw new Error('Clients not found');

    return clients;
  }

  async resetPassword(userId: string, password: string): Promise<string> {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { password: password },
      { new: true }
    ).exec();

    if (!updatedUser)
      throw new Error("User not found or password update failed.");
    return "Password reset successfully!";
  }

  async alterUserProfile(
    userId: string,
    userData: { editData: User, unchangedData: User },
    type: string
  ): Promise<{ user: User }> {
    const { editData } = userData;
    editData.isProfileFilled = true;
    if (type === "verify") {
      const user = await UserModel.findByIdAndUpdate(userId, editData, {
        new: true,
      }).lean<User>().exec();

      if (!user) throw new Error("User not found");
      return {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          profilePicture: user.profilePicture,
          isBlocked: user.isBlocked,
          isProfileFilled: user.isProfileFilled,
          password: user.password,
          mobile: user.mobile,
          skills: user.skills,
          location: user.location,
          description: user.description,
          experience: user.experience,
          education: user.education,
          budget: user.budget,
          rating: user.rating,
          domain: user.domain,
          githubLink: user.githubLink,
          totalJobs: user.totalJobs,
          totalHours: user.totalHours,
          whyHireMe: user.whyHireMe,
          completedJobs: user.completedJobs,
          inProgress: user.inProgress,
          workHistory: user.workHistory,
          isEditRequest: user.isEditRequest,
          request: user.request,
          wallet: user.wallet,
          isBoosted: user.isBoosted,
          createdAt: user.createdAt
        } as User,
      };
    } else {
      const user = await UserModel.findByIdAndUpdate(userId, editData, {
        new: true,
      }).lean<User>().exec();

      if (!user) throw new Error("User not found");

      return {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          profilePicture: user.profilePicture,
          isBlocked: user.isBlocked,
          isProfileFilled: user.isProfileFilled,
          password: user.password,
          mobile: user.mobile,
          skills: user.skills,
          location: user.location,
          description: user.description,
          experience: user.experience,
          education: user.education,
          budget: user.budget,
          rating: user.rating,
          domain: user.domain,
          githubLink: user.githubLink,
          totalJobs: user.totalJobs,
          totalHours: user.totalHours,
          whyHireMe: user.whyHireMe,
          completedJobs: user.completedJobs,
          inProgress: user.inProgress,
          workHistory: user.workHistory,
          isEditRequest: user.isEditRequest,
          request: user.request,
          wallet: user.wallet,
          isBoosted: user.isBoosted,
          createdAt: user.createdAt
        } as User
      };
    }
  }

  async viewProposals(userId: string): Promise<Proposal[]> {
    let findProposals = await ClientModel.find({
      proposals: { $elemMatch: { userId } },
    }).exec();

    if (!findProposals.length) throw new Error("No proposal found");

    let proposals: Proposal[] = [];

    for (let i = 0; i < findProposals.length; i++) {
      proposals.push(...(findProposals[i].proposals as Proposal[]));
    }

    const finalProposals = proposals.flat(1);
    return finalProposals
  }


  async createProposal(
    userId: Id,
    jobPostId: Id,
    description: Id,
    bidAmount: number,
    bidDeadline: number
  ): Promise<{ proposal: Client, notification: unknown }> {
    //CHECK IF MAX PROP REACHED
    const proposals = await JobPostModel.findById(jobPostId).lean<JobPostDocument>().exec();
    if (!proposals) throw new Error('Jobpost not found');
    const { proposalCount, maxProposals } = proposals;
    if (proposalCount === maxProposals)
      throw new Error("Maximum proposals reched");

    const user = await UserModel.findById(userId);

    if (!user) throw new Error("User not found");
 
    //Removing existing proposal doc
    const existingProposal = await ClientModel.find({
      $and: [
        { "proposals.userId": userId },
        { "proposals.jobPostId": jobPostId },
      ],
    });

    if (existingProposal.length !== 0) {
      throw new Error("Proposal alredy send");
    } else {
      const jobpost = await JobPostModel.findByIdAndUpdate(
        jobPostId,
        {
          $inc: { proposalCount: 1 },
        },
        {
          new: true,
        }
      );
      if (!jobpost) throw new Error('Jobpost not found');

      // deletes invite doc if exists
      const clearInvite = await InviteModel.deleteOne({ "jobPostData._id": jobPostId });

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
      ).lean<Client>();

      if (!proposal) throw new Error('Proposals not found')


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

  async listHomeJobs(type: string): Promise<{
    latestJobs?: JobPostDocument[],
    allJobs?: JobPostDocument[], totalJobs?: number,
    totalHours?: unknown, verifiedAccounts?: number
  }> {
    if (type === "listAllJobs") {
      const totalJobs = await JobPostModel.countDocuments();

      const verifiedAccounts = await ClientModel.countDocuments({
        isVerified: true,
      });

      const allJobs = await JobPostModel.find({ status: "pending" })
        .limit(3)
        .exec();

      const totalHours: unknown = await JobPostModel.aggregate([
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

      return { latestJobs };
    } else {
      throw new Error("Jobs not founded");
    }
  }


  async getSelectedJobs(
    userId: string,
    jobType: string,
    query: {
      amount: number
      paymentType: 'hourly' | 'fixed'
      expertLevel: 'beginner' | 'intermediate' | 'advanced'
    },
    currentPage: number
  ): Promise<{
    jobs: JobPostDocument[],
    totalPages: number | undefined
  }> {
    const page_size: number = 4;
    const skip: number = (currentPage - 1) * page_size;

    const user = await UserModel.findById(userId).exec();

    if (!user || !user.skills)
      throw new Error("User has no skills or does not exist.");

    if (jobType === "listAllJobs") {
      let totalJobs, jobs, totalPages;

      if (query.amount) {
        if (Number(query.amount) === 500) {
          totalJobs = await JobPostModel.countDocuments({
            status: "pending",
            amount: { $gt: 100, $lt: 500 }
          });

          totalPages = Math.ceil(totalJobs / page_size);

          jobs = await JobPostModel.find({
            status: "pending",
            amount: { $gt: 100, $lt: 500 }
          })
            .skip(skip)
            .limit(page_size);

        } else if (Number(query.amount) === 2000) {
          totalJobs = await JobPostModel.countDocuments({
            status: "pending",
            amount: { $gt: 500, $lt: 2000 }
          });

          totalPages = Math.ceil(totalJobs / page_size);

          jobs = await JobPostModel.find({
            status: "pending",
            amount: { $gt: 500, $lt: 2000 }
          })
            .skip(skip)
            .limit(page_size);
        } else if (Number(query.amount) === 10000) {
          totalJobs = await JobPostModel.countDocuments({
            status: "pending",
            amount: { $gt: 2000, $lt: 200000 }
          });

          totalPages = Math.ceil(totalJobs / page_size);

          jobs = await JobPostModel.find({
            status: "pending",
            amount: { $gt: 2000, $lt: 10000 }
          })
            .skip(skip)
            .limit(page_size);
        } else if (Number(query.amount) === 50000) {
          totalJobs = await JobPostModel.countDocuments({
            status: "pending",
            amount: { $gt: 10000, $lt: 50000 }
          });

          totalPages = Math.ceil(totalJobs / page_size);

          jobs = await JobPostModel.find({
            status: "pending",
            amount: { $gt: 10000, $lt: 50000 }
          })
            .skip(skip)
            .limit(page_size);
        } else if (Number(query.amount) === 70000) {
          totalJobs = await JobPostModel.countDocuments({
            status: "pending",
            amount: { $gt: 50000, $lt: 70000 }
          });

          totalPages = Math.ceil(totalJobs / page_size);

          jobs = await JobPostModel.find({
            status: "pending",
            amount: { $gt: 50000, $lt: 70000 }
          })
            .skip(skip)
            .limit(page_size);
        }
      } else if (query.expertLevel) {
        if (query.expertLevel === 'beginner') {
          totalJobs = await JobPostModel.countDocuments({ $and: [{ status: "pending" }, { expertLevel: 'beginner' }] });
          totalPages = Math.ceil(totalJobs / page_size);
          jobs = await JobPostModel.find({ $and: [{ status: "pending" }, { expertLevel: 'beginner' }] })
            .skip(skip)
            .limit(page_size);

        } else if (query.expertLevel === 'intermediate') {

          totalJobs = await JobPostModel.countDocuments({ $and: [{ status: "pending" }, { expertLevel: 'intermediate' }] });
          totalPages = Math.ceil(totalJobs / page_size);
          jobs = await JobPostModel.find({ $and: [{ status: "pending" }, { expertLevel: 'intermediate' }] })
            .skip(skip)
            .limit(page_size);
        } else if (query.expertLevel === 'advanced') {
          totalJobs = await JobPostModel.countDocuments({ $and: [{ status: "pending" }, { expertLevel: 'advanced' }] });
          totalPages = Math.ceil(totalJobs / page_size);
          jobs = await JobPostModel.find({ $and: [{ status: "pending" }, { expertLevel: 'advanced' }] })
            .skip(skip)
            .limit(page_size);
        }
      } else if (query.paymentType) {
        if (query.paymentType === 'hourly') {
          totalJobs = await JobPostModel.countDocuments({ status: "pending", paymentType: 'hourly' });
          totalPages = Math.ceil(totalJobs / page_size);
          jobs = await JobPostModel.find({ $and: [{ status: "pending" }, { paymentType: 'hourly' }] })
            .skip(skip)
            .limit(page_size);
        } else if (query.paymentType === 'fixed') {
          totalJobs = await JobPostModel.countDocuments({ $and: [{ status: "pending" }, { paymentType: 'fixed' }] });
          totalPages = Math.ceil(totalJobs / page_size);
          jobs = await JobPostModel.find({ $and: [{ status: "pending" }, { paymentType: 'fixed' }] })
            .skip(skip)
            .limit(page_size);
        }
      }

      if (!jobs) throw new Error("No jobs found");

      return {
        jobs,
        totalPages,
      };
    } else if (jobType === "trendingJobs") {
      let totalJobs, jobs, totalPages;
      totalJobs = await JobPostModel.countDocuments();
      totalPages = Math.ceil(totalJobs / page_size);
      jobs = await JobPostModel.find({ status: "pending" })
        .sort({
          proposalCount: -1,
        })
        .skip(skip)
        .limit(page_size);


      if (query.amount) {
        if (query.amount === 500) {
          totalJobs = await JobPostModel.countDocuments({ $and: [{ status: "pending", }, { amount: { $and: [{ $lt: 500 }, { $gt: 100 }] } }] });
          totalPages = Math.ceil(totalJobs / page_size);
          jobs = await JobPostModel.find({ $and: [{ status: "pending", }, { amount: { $and: [{ $lt: 500 }, { $gt: 100 }] } }] })
            .sort({
              proposalCount: -1,
            })
            .skip(skip)
            .limit(page_size);
        } else if (query.amount === 2000) {
          totalJobs = await JobPostModel.countDocuments({
            $and: [{ status: "pending", }, { amount: { $and: [{ $lt: 2000 }, { $gt: 500 }] } }]
          });
          totalPages = Math.ceil(totalJobs / page_size);
          jobs = await JobPostModel.find({ $and: [{ status: "pending", }, { amount: { $and: [{ $lt: 2000 }, { $gt: 500 }] } }] })
            .sort({
              proposalCount: -1,
            })
            .skip(skip)
            .limit(page_size);
        } else if (Number(query.amount) === 10000) {
          totalJobs = await JobPostModel.countDocuments({ $and: [{ status: "pending", }, { $and: [{ amount: { $lt: 10000 } }, { amount: { $gt: 2000 } }] }] });
          totalPages = Math.ceil(totalJobs / page_size);
          jobs = await JobPostModel.find({ $and: [{ status: "pending", }, { $and: [{ amount: { $lt: 10000 } }, { amount: { $gt: 2000 } }] }] })
            .sort({
              proposalCount: -1,
            })
            .skip(skip)
            .limit(page_size);
        } else if (query.amount === 50000) {
          totalJobs = await JobPostModel.countDocuments({ $and: [{ status: "pending", }, { amount: { $and: [{ $lt: 50000 }, { $gt: 10000 }] } }] });
          totalPages = Math.ceil(totalJobs / page_size);
          jobs = await JobPostModel.find({ $and: [{ status: "pending", }, { amount: { $and: [{ $lt: 50000 }, { $gt: 10000 }] } }] })
            .sort({
              proposalCount: -1,
            })
            .skip(skip)
            .limit(page_size);
        } else if (query.amount === 70000) {
          totalJobs = await JobPostModel.countDocuments({ $and: [{ status: "pending", }, { amount: { $and: [{ $lt: 70000 }, { $gt: 50000 }] } }] });
          totalPages = Math.ceil(totalJobs / page_size);
          jobs = await JobPostModel.find({ $and: [{ status: "pending", }, { amount: { $and: [{ $lt: 70000 }, { $gt: 50000 }] } }] })
            .sort({
              proposalCount: -1,
            })
            .skip(skip)
            .limit(page_size);
        }
      } else if (query.expertLevel) {
        if (query.expertLevel === 'beginner') {
          totalJobs = await JobPostModel.countDocuments({ $and: [{ status: "pending" }, { expertLevel: 'beginner' }] });
          totalPages = Math.ceil(totalJobs / page_size);
          jobs = await JobPostModel.find({ $and: [{ status: "pending" }, { expertLevel: 'beginner' }] })
            .sort({
              proposalCount: -1,
            })
            .skip(skip)
            .limit(page_size);
        } else if (query.expertLevel === 'intermediate') {

          totalJobs = await JobPostModel.countDocuments({ $and: [{ status: "pending" }, { expertLevel: 'intermediate' }] });
          totalPages = Math.ceil(totalJobs / page_size);
          jobs = await JobPostModel.find({ $and: [{ status: "pending" }, { expertLevel: 'intermediate' }] })
            .sort({
              proposalCount: -1,
            })
            .skip(skip)
            .limit(page_size);
        } else if (query.expertLevel === 'advanced') {
          totalJobs = await JobPostModel.countDocuments({ $and: [{ status: "pending" }, { expertLevel: 'advanced' }] });
          totalPages = Math.ceil(totalJobs / page_size);
          jobs = await JobPostModel.find({ $and: [{ status: "pending" }, { expertLevel: 'advanced' }] })
            .sort({
              proposalCount: -1,
            })
            .skip(skip)
            .limit(page_size);
        }
      } else if (query.paymentType) {
        if (query.paymentType === 'hourly') {
          totalJobs = await JobPostModel.countDocuments({ $and: [{ status: "pending" }, { paymentType: 'houly' }] });
          totalPages = Math.ceil(totalJobs / page_size);
          jobs = await JobPostModel.find({ $and: [{ status: "pending" }, { paymentType: 'houly' }] })
            .sort({
              proposalCount: -1,
            })
            .skip(skip)
            .limit(page_size);
        } else if (query.paymentType === 'fixed') {
          totalJobs = await JobPostModel.countDocuments({ $and: [{ status: "pending" }, { paymentType: 'fixed' }] });
          totalPages = Math.ceil(totalJobs / page_size);
          jobs = await JobPostModel.find({ $and: [{ status: "pending" }, { paymentType: 'fixed' }] })
            .sort({
              proposalCount: -1,
            })
            .skip(skip)
            .limit(page_size);
        }
      }

      if (!jobs) throw new Error("No jobs found");

      return {
        jobs,
        totalPages,
      };


    } else if (jobType === "bestMatches") {
      let totalJobs, jobs, totalPages;
      const userSkills = user.skills;

      totalJobs = await JobPostModel.countDocuments({
        $and: [
          { status: "pending" },
          { requiredSkills: { $elemMatch: { $in: userSkills } } },
        ],
      });
      totalPages = Math.ceil(totalJobs / page_size);
      jobs = await JobPostModel.find({
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
    progress: number
  ): Promise<{ updateUserWallet: User, updateAdminWallet: unknown }> {
    const currentContract = await ContractModel.findByIdAndUpdate(
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
    ).lean<User>().exec();
    if (!updateUserWallet) throw new Error('Wallet is not available')

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
    if (!updateAdminWallet) throw new Error('Wallet is not available')


    return { updateUserWallet, updateAdminWallet };
  }

  async viewSingleContract(contractId: Id): Promise<ContractDocument> {
    const contract = await ContractModel.findById(contractId);
    if (!contract) throw new Error("contract not found");

    return contract;
  }

  async viewContracts(
    userId: Id,
    contractViewType: string,
    currentPage: number
  ): Promise<{ contract: ContractDocument[], totalPages: number }> {
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

  async boostSuccess(userId: Id): Promise<unknown> {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        isBoosted: true,
      },
      {
        new: true,
      }
    );

    if (!user) throw new Error("User not found");
    return user?.request;
  }

  async getSingleJobPost(jobPostId: string): Promise<JobPostDocument> {
    const jobPost = await JobPostModel.findById(jobPostId).exec();
    if (!jobPost) throw new Error("Job Post didnt found");

    return jobPost;
  }

  async submitProject(
    contractId: string,
    body: { description: string; progress: number; attachedFile: string }
  ): Promise<unknown> {
    const contract = await ContractModel.findByIdAndUpdate(
      contractId,
      {
        status: "submitted",
      },
      {
        update: true,
      }
    ).lean<ContractDocument>();
    if (!contract) throw new Error('Contract not exists');

    const clientId = contract.clientId;
    const jobPostId = contract.jobPostId;

    const jobPost = await JobPostModel.findById(jobPostId).lean<JobPostDocument>().exec();
    if (!jobPost) throw new Error('Jobpost doesnt exists');

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

  async viewWallet(userId: string, currentPage: number): Promise<{ wallet: Wallet[], totalPages: number }> {
    const page_size: number = 6;
    const skip: number = (currentPage - 1) * page_size;

    const theWallet = await UserModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
      { $project: { totalTransactions: { $size: "$wallet.transactions" } } },
    ]);

    const totalTransactions =
      theWallet.length > 0 ? theWallet[0].totalTransactions : 0;
    const totalPages: number = Math.ceil(totalTransactions / page_size);

     const wallet = await UserModel.aggregate([
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
      wallet,
      totalPages,
    };
  }

  

 

  async searchJobsBySkills(input: string): Promise<JobPostDocument[]> {
    const jobs = await JobPostModel.find({
      requiredSkills: { $regex: input, $options: "i" },
    });
    if (!jobs) throw new Error("No jobs found");

    return jobs;
  }

  async withdrawMoney(
    userId: Id,
    amount: number,
    accountNumber: number
  ): Promise<void> {
    let userName; 
      const user = await UserModel.findById(userId).lean<User>().exec();
      if (!user) throw new Error('user not exists');
      userName = user.name;
     

    const adminId: string = process.env.ADMIN_OBJECT_ID as string;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid userId: Must be a 24-character hex string.");
    }
    const withdrawRequestObject = {
      roleType: 'user',
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

    return;
  }
}
