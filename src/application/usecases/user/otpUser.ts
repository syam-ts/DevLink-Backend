interface UserDoc {
    name: string;
    email: string;
    mobile: number;
}

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
}

export interface UserRepository {
    createUser(user: User): Promise<User>;
    verifyOtp(user: {
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
      }): Promise<UserDoc>;
}

export class VerifyOtp {
  
    constructor(private userRepository: UserRepository) { }
     

    async execute(user: {
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
      }) {
        
        const verifiedOtp = await this.userRepository.verifyOtp(user);
        return verifiedOtp;
    }
}
