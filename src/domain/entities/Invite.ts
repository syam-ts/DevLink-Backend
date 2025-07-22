 

interface JobPostData {
    _id: string;
    title: string;
    description: string;
    expertLevel: "beginner" | "intermediate" | "advanced";
    location: string;
    requiredSkills: string[];
    amount: number;
    paymentType: "hourly" | "fixed";
    estimateTimeinHours: Number;
    projectType: "ongoing project" | "project updation";
}

interface ClientData {
    companyName: string;
    email: string;
    location: string;
}

export interface IInviteDocument {
    userId?: string;
    clientId?: string;
    description: String;
    jobPostData?: JobPostData;
    clientData: ClientData;
    status: "pending" | "rejected";
    createdAt: Date;
}