import { IUserRepository } from "../../../domain/interfaces/IUserRepository";

 
    interface UserData {
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
      review?: [{
        theReview: string;
        rating: number;
        companyName: string;
      }];
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
     
  interface ProfileData {
    editData: UserData
    unchangedData: UserData
  };

 


export class AlterUserProfile {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string, profileData: ProfileData, type: string) {
    if (type === "verify") {
      const updatedUser = await this.userRepository.alterUserProfile(
        userId,
        profileData,
        type
      );

      if (!updatedUser) {
        throw new Error("Profile editing failed");
      }

      return updatedUser;
    } else if (type === "edit") {  

      for (let value in profileData.editData) {
        if (profileData.editData[value] == "") {
          profileData.editData[value] = profileData.unchangedData[value];
        }
      }
      const type: string = "edit"; 
      const updatedUser = await this.userRepository.alterUserProfile(
        userId,
        profileData,
        type
      );
      if (!updatedUser) {
        throw new Error("Profile editing failed");
      }

      return updatedUser;
    } else {
      throw new Error('Wrong selection');
    }
  }
};
