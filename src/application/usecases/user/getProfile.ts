

export interface UserRepositary {
    findUserById(userId: string): Promise< any >
}

 


export class GetUserProfile {
    constructor(private userRepositary: UserRepositary) {}

   async execute(userId: string) {
        const {user} = await this.userRepositary.findUserById(userId); 
        if(!user) {
            throw new Error('User not found')
        }
        

        return {
            name: user.name,
            budget: user.budget,
            location: user.location,
            mobile: user.mobile,
            skills: user.skills,
            profilePicture: user.profilePicture,
            domain: user.domain,
            githugLink: user.githubLink,
            description: user.description,
            whyHireMe: user.whyHireMe,
            experience: user.experience,
            education: user.education,
            isProfileFilled: user.isProfileFilled
        };
    }
}