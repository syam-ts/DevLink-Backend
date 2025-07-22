import { ProjectSubmissions } from "../../application/usecases/client/viewSubmissions"; 
import { IAdmin } from "../entities/Admin";
import { IClient } from "../entities/Client";
import { IContractDocument } from "../entities/Contract";
import { IProposal, IUser } from "./IUserRepository";


export interface IClientRepository {
    
 createClient(client: IClient): Promise<IClient>

   signupClient(email: string): Promise<IClient | null> 

  verifyOtp(client: {
    mailOtp: number;
    userOtp: string;
    user: {
      otp: string;
      data: { name: string; email: string; password: string };
    };
  }): Promise<IClient>

 findClientByEmail(email: string): Promise<IClient | null>
 findClientByEmailAndPassword(
    email: string,
    password: string
  ): Promise<{
    _id: string;
    companyName: string;
    email: string;
    password: string;
    isBlocked: boolean;
    isVerified: boolean;
  }>
  findClientByOnlyEmail(
    email: string,
    companyName: string,
    password: string
  ): Promise<{
    _id: string;
    companyName: string;
    email: string;
    password: string;
    isBlocked: boolean;
    isVerified: boolean;
  }>

    findAllUsers(): Promise<IUser[]> 

   resetPassword(clientId: string, password: string): Promise<string> 

     getClientProfile(clientId: string): Promise<IClient> 


  profileVerification(
    clientId: string,
    data: { unChangedData: IClient; editData: IClient }
  ): Promise<IAdmin>




   editClientProfile(
    clientId: string,
    editData: { editData: Partial<IClient>; unChangedData: IClient },
    unChangedData: IClient
  ): Promise<IAdmin> 

     getProposals(clientId: string): Promise<IProposal[]> 



   getUserProfile(userId: string): Promise<IUser> 



 getallDevelopers(): Promise<IUser[] | unknown>


 viewContracts(
    clientId: string,
    contractViewType: string,
    currentPage: number
  ): Promise<{ contract: IContractDocument[]; totalPages: number }> 


   viewWallet(
    clientId: string,
    page: number
  ): Promise<{
    wallet: unknown;
    totalPages: number;
  }> 

   addMoneyToAdminWallet(
    role: string,
    roleId: string,
    amount: number
  ): Promise<string>


   viewSubmissions(clientId: string): Promise<ProjectSubmissions> 



   createContract(
    clientId: string,
    userId: string,
    jobPostId: string,
    bidAmount: number,
    bidDeadline: string
  ): Promise<{
    newNotificationUser: Notification;
    newNotificationClient: Notification;
  }> 

 rejectProposal(
    clientId: string,
    userId: string,
    jobPostId: string
  ): Promise<IClient> 


   closeContract(contractId: string, progress: number): Promise<unknown> 



   rateAndReviewUser(
    userId: string,
    clientId: string,
    notificationId: string,
    rating: number,
    review: string
  ): Promise<{ updateUser: IUser; removeExtra: Notification }> 



 rejectContract(
    contractId: string,
    clientId: string
  ): Promise<IContractDocument>


   searchDeveloperBySkills(input: string): Promise<IUser> 




   withdrawMoney(
    clientId: string,
    amount: number,
    accountNumber: number
  ): Promise<void> 










}