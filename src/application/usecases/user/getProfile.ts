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
  
}
export interface UserRepository {
  findUserById(userId: string): Promise<User>;
}

export class GetUserProfile {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string) {
    const user = await this.userRepository.findUserById(userId); 

    return {
      name: user.name,
      email: user.email,
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
      totalJobs: user.totalJobs,
      totalHours: user.totalHours,
    };
  }
};
