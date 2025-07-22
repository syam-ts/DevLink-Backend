
interface IJobs {
  _id: string | unknown;
  title: string;
  description: string;
  expertLevel: string;
  location: string;
  amount: number;
  paymentType: string;
  estimateTimeinHours: number;
  projectType: string;
  requiredSkills: [string];
}



export interface IUser {
  _id?: string;
  name: string;
  age?: number;
  password?: string;
  mobile?: number;
  email: string;
  profilePicture?: string;
  description?: string;
  location?: string;
  skills?: [string];
  experience: string;
  budget: number;
  key?: string;
  experienceDescription?: string;
  rating: {
    ratingSum: number;
    noOfRating: number;
    avgRating: number;
  };
  review: [
    {
      theReview: string;
      rating: number;
      companyName: string;
    }
  ];
  totalJobs: number;
  totalHours: number;
  domain: string;
  whyHireMe: string;
  githubLink: string;
  education: [string];
  completedJobs: number;
  inProgress: number;
  workHistory: [IJobs];
  isEditRequest: boolean;
  request: [
    {
      type: string;
      contractInfo: string;
      created: Date;
    }
  ];
  wallet: {
    balance: { type: Number; required: false };
    transactions: [
      {
        type: [];
      }
    ];
  };
  isBlocked: boolean;
  isBoosted: boolean;
  isProfileFilled: boolean;
  createdAt: Date;
}

