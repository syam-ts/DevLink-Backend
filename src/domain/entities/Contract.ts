export interface IContractDocument {
  clientId?: string;
  userId?: string;
  jobPostId?: string;
  clientData: string;
  userData: string;
  jobPostData: string;
  amount: number;
  deadline: number;
  active: Boolean;
  status: "on progress" | "pending" | "submitted" | "closed";
  createdAt: Date;
}
