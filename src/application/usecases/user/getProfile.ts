interface User {
  name: string
  budget: number
  location: string
  mobile: number
  skills: string[]
  profilePicture: string
  domain: string
  rating: number
  review: string[]
  githubLink: string
  description: string
  whyHireMe: string
  experience: string
  education: string[]
  isBoosted: boolean
  isProfileFilled: boolean
  workHistory: string[]
};

export interface UserRepositary {
  findUserById(userId: string): Promise<User>;
}

export class GetUserProfile {
  constructor(private userRepositary: UserRepositary) {}

  async execute(userId: string) {
    const user = await this.userRepositary.findUserById(userId);

    return {
      name: user.name,
      budget: user.budget,
      location: user.location,
      mobile: user.mobile,
      skills: user.skills,
      profilePicture: user.profilePicture,
      domain: user.domain,
      rating: user.rating,
      review: user.review,
      githugLink: user.githubLink,
      description: user.description,
      whyHireMe: user.whyHireMe,
      experience: user.experience,
      education: user.education,
      isBoosted: user.isBoosted,
      isProfileFilled: user.isProfileFilled,
      workHistory: user.workHistory,
    };
  }
}
