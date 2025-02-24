export interface UserRepositary {
  editUserProfile(userId: string, editData: any,type: string): Promise<any>;
}

interface ProfileData {
    editData: EditData
    unchangedData: EditData
}

interface EditData {
  [key: string]: string | number | string[],
   name: string,
   budget: number,
   age: number,
   location: string,
   mobile: number,
   skills: string,
   profilePicture: string,
   domain: string,
   githubLink: string,
   description: string,
   whyHireMe: string,
   experience: string,
   education: string  
}


export class EditUserProfile {
  constructor(private userRepositary: UserRepositary) { }

  async execute(userId: string, profileData: ProfileData, type: string) {

    if (type === 'verify') {

 
  

       
      console.log("Reached here so far")

      const updatedUser = await this.userRepositary.editUserProfile(
        userId,
        profileData,
        type
      );
      console.log('Updated user: ', updatedUser)
      if (!updatedUser) {
        throw new Error("Profile editing failed");
      }



      return updatedUser;



    } else if (type === 'edit') {




      if (profileData.editData.name) {
        if (
          profileData.editData.name.length <= 3 ||
          profileData.editData.name.length > 20
        ) {
          throw new Error("Name should contain atlest 4 characters");
        }
      }

      if (profileData.editData.age) {
        if (profileData.editData.age < 18 || profileData.editData.age > 70) {
          if (profileData.editData.age < 18) {
            throw new Error("Only adult can verify");
          } else if (profileData.editData.age > 70) {
            throw new Error("You need to be under 70");
          } else {
            throw new Error("Age need to be valid");
          }
        }
      }

      if (profileData.editData.mobile) {
        if (profileData.editData.mobile.toString().length < 10) {
          throw new Error("Number should be atlest 10 digits");
        }
      }

      if (profileData.editData.location) {
        if (profileData.editData.location.length < 3) {
          throw new Error("Location need to valid");
        }
      }

      //TODO
      // if(typeof(profilePicture) === 'png | svg | jpeg | jpg') {
      //     throw new Error('Invalid Profile picture')
      // }

      if (profileData.editData.description) {
        if (profileData.editData.description.length < 15) {
          throw new Error("Description should atlest need 15 words");
        }
      }

      if (!profileData.editData.skills) {
        if (profileData.editData.skills.length < 2) {
          throw new Error("Add atlest 2 skills");
        }
      }

      if (profileData.editData.budget) {
        if (
          profileData.editData.budget < 100 ||
          profileData.editData.budget > 2000
        ) {
          if (profileData.editData.budget < 100) {
            throw new Error("Pay per Hour need to be atlest 100₹");
          } else if (profileData.editData.budget > 2000) {
            throw new Error("Maximum pay per hour is 2000₹");
          }
        }
      }

      for (let value in profileData.editData) {
        if (profileData.editData[value] == "") {
          profileData.editData[value] = profileData.unchangedData[value];
        }
      }
      const type: string = 'edit';

      const updatedUser = await this.userRepositary.editUserProfile(
        userId,
        profileData,
        type
      );
      if (!updatedUser) {
        throw new Error("Profile editing failed");
      }



      return updatedUser ;
    }
  }
}
