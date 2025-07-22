export interface IJobPostDocument {
  _id?: string;
  title: string;
  description: string;
  keyResponsiblities: [string];
  requiredSkills: [string];
  estimateTime: number;
  estimateTimeinHours: number;
  paymentType: "hourly" | "fixed";
  amount: number;
  expertLevel: "beginner" | "intermediate" | "advanced";
  location: string;
  projectType: "ongoing project" | "project updation";
  maxProposals: number;
  proposalCount: number; 
  aboutClient: {
    companyName: string;
    location: string;
    totalSpend: number;
    totalHours: number;
    domain: string;
    numberOfEmployees: number;
    joined: Date;
  };
  status: "on progress" | "finished";
  isPayment: boolean;
  createdAt: Date;
  clientId?: string;
}
