import { User } from "../../../domain/entities/User";

export interface UserRepositary {
  alterUserProfile(
    userId: string,
    editData: ProfileData,
    type: string
  ): Promise<User>
};

interface ProfileData {
  editData: EditData
  unchangedData: EditData
};

interface EditData {
  [key: string]: string | number | string[]
  name: string
  budget: number
  age: number
  location: string
  mobile: number
  skills: string
  profilePicture: string
  domain: string
  githubLink: string
  description: string
  whyHireMe: string
  experience: string
  education: string
}

export class AlterUserProfile {
  constructor(private userRepositary: UserRepositary) {}

  async execute(userId: string, profileData: ProfileData, type: string) {
    if (type === "verify") {
      const updatedUser = await this.userRepositary.alterUserProfile(
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
      const updatedUser = await this.userRepositary.alterUserProfile(
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
