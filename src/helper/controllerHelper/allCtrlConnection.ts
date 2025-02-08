// User imports ---------------->

import { SignupUser } from "../../application/usecases/user/signupUser";
import { LoginUser } from "../../application/usecases/user/loginUser";
import { GoogleLoginUser } from "../../application/usecases/user/GoogleLoginUser";
import { getHomeUser } from "../../application/usecases/user/getHomeUser";
import { LogoutUser } from "../../application/usecases/user/logoutUser";
import { verifyOtp } from "../../application/usecases/user/otpUser";
import { VerifyEmail } from "../../application/usecases/user/verifyEmail";
import { ResetPassword } from "../../application/usecases/user/resetPassword";
import { UserRepositoryMongoose } from "../../domain/interfaces/Repositaries/UserRepositoryMongoose ";
import { EditUserProfile } from "../../application/usecases/user/editProfile"; 
import { GetUserProfile } from "../../application/usecases/user/getProfile";
import { ListHomeJobs } from "../../application/usecases/user/listHomeJobs";
import { GetSelectedJobs } from "../../application/usecases/user/getSelectedJobs";
import { CreateProposal } from "../../application/usecases/user/createProposal";  
import { AllContracts } from "../../application/usecases/user/allContracts"; 
import { AllNotifications } from "../../application/usecases/user/allNotifications"; 
import { BoostPayment } from "../../application/usecases/user/boostPayment"; 
import { BoostSuccess } from "../../application/usecases/user/bosstSuccess"; 
import { GetSingleJobPost } from "../../application/usecases/user/getSingleJobPost"; 
import { ViewMyContracts } from "../../application/usecases/user/viewContracts"; 
import { ViewSubmittedContracts } from "../../application/usecases/user/viewSubmittedContracts";  
import { SubmitProject } from "../../application/usecases/user/sumbitProject";  
import { ChatBot } from "../../application/usecases/user/ChatBot";   
import { AddToWishlist } from "../../application/usecases/user/addToWishlist";   
import { GetAllProposals } from "../../application/usecases/user/getAllProposals"; 
import { ViewWalletUser } from "../../application/usecases/user/viewWalletUser"; 


import { AllClients } from "../../application/usecases/user/allClients";   



// Client imports ---------------->

import { SignupClient } from '../../application/usecases/client/signupClient';
import { LoginClient } from '../../application/usecases/client/loginClient';
import { GoogleLoginClient } from '../../application/usecases/client/GoogleLoginClient';
import { ClientRepositoryMongoose } from '../../domain/interfaces/Repositaries/ClientRepositoryMongoose';  
import { getHomeClient } from '../../application/usecases/client/getHomeClient';
import { LogoutClient } from '../../application/usecases/client/logoutClient';
import { VerifyEmailClient } from '../../application/usecases/client/verifyEmail';
import { ResetPasswordClient } from '../../application/usecases/client/resetPassword';
import { verifyOtpClient } from '../../application/usecases/client/otpClient';
import { EditClientProfile } from '../../application/usecases/client/EditClientProfile';
import { GetClientProfile } from '../../application/usecases/client/getProfile';
import { ProfileVerification } from '../../application/usecases/client/profileVerification';
import { CreateJobPost } from '../../application/usecases/client/createJobPost';
import { GetAllNotifications } from '../../application/usecases/client/getAllNotifications';
import { ListAllJobsClient } from '../../application/usecases/client/listAllJobs';
import { MakePayment } from '../../application/usecases/client/makePayment';
import { GetUserProfileClient } from '../../application/usecases/client/getUserProfile';
import { GetProposals } from '../../application/usecases/client/getProposals';
import { GetMyJobs } from '../../application/usecases/client/getMyJobs';
import { LatestJobs } from '../../application/usecases/client/latestJobs';
import { CreateContract } from '../../application/usecases/client/createContract';
import { RejectProposal } from '../../application/usecases/client/rejectProposal';
import { MyContracts } from '../../application/usecases/client/myContracts'; 
import { ViewContract } from '../../application/usecases/client/viewContract';
import { ViewSubmissions } from '../../application/usecases/client/viewSubmissions';
import { CloseContract } from '../../application/usecases/client/closeContract';
import { RateUser } from '../../application/usecases/client/rateUser';
import { CreateChat } from '../../application/usecases/client/createChat';
import { SendMessage } from '../../application/usecases/client/sendMessage';
import { GetAllChats } from '../../application/usecases/client/getAllChats';
import { ViewWallet } from '../../application/usecases/client/viewWallet';
import { ViewChat } from '../../application/usecases/client/viewChat';
import { GetallDevelopers } from '../../application/usecases/client/getallDevelopers';
import { ChatRepositoryMongoose } from "../../domain/interfaces/Repositaries/ChatRepository";
import { WishlistRepositoryMongoose } from "../../domain/interfaces/WishlistRepository";
 

// admin imports ----->

import { LoginAdmin } from '../../application/usecases/admin/loginAdmin';
import { AdminRepository } from '../../domain/interfaces/Repositaries/AdminRepository';
import { GetDashboard } from '../../application/usecases/admin/getDashboard';
import { GetAllUsers } from '../../application/usecases/admin/getAllUsers';
import { GetAllClients } from '../../application/usecases/admin/getAllClients';
import { BlockUser, BlockClient } from '../../application/usecases/admin/blockRole';
import { UnBlockUser, UnBlockClient } from '../../application/usecases/admin/unBlockRole';
import { Create } from '../../application/usecases/admin/create';
import { VerifyAccept } from '../../application/usecases/admin/verifyAccept';
import { GetAllRequests } from '../../application/usecases/admin/getAllRequests';
import { GetRequestedClient } from '../../application/usecases/admin/getRequestedClient';
import { ViewRoleInfo } from '../../application/usecases/admin/viewRoleInfo';
import { GetWallet } from '../../application/usecases/admin/getWallet';
import { SearchUser } from '../../application/usecases/admin/searchUser';
import { SortUser } from '../../application/usecases/admin/sortUser';
import { SearchClient } from '../../application/usecases/admin/searchClient';
import { SortClient } from '../../application/usecases/admin/sortClient';



// User Respo instance  ---------->

const userRepository = new UserRepositoryMongoose();
const wishlistRepository = new WishlistRepositoryMongoose();
const signupUseCase = new SignupUser(userRepository);
const loginUseCase = new LoginUser(userRepository);
const getHomeUseCase = new getHomeUser(userRepository);
const logoutUserUseCase = new LogoutUser(userRepository);
const verifyEmailUseCase = new VerifyEmail(userRepository);
const resetPasswordUseCase = new ResetPassword(userRepository);
const verifyUserUseCase = new verifyOtp(userRepository);
const GoogleLoginUserUseCase = new GoogleLoginUser(userRepository);
const editProfileUseCase = new EditUserProfile(userRepository);
const getProfileUseCase = new GetUserProfile(userRepository);
const listHomeJobsUseCase = new ListHomeJobs(userRepository);
const getSelectedJobsUseCase = new GetSelectedJobs(userRepository);
const createProposalUseCase = new CreateProposal(userRepository); 
const allContractsUseCase = new AllContracts(userRepository);
const allNotificationsUseCase = new AllNotifications(userRepository);
const boostAccountUseCase = new BoostPayment(userRepository);
const boostSuccessUseCase = new BoostSuccess(userRepository);
const getSingleJobPostUseCase = new GetSingleJobPost(userRepository);
const viewMyContractsUseCase = new ViewMyContracts(userRepository);
const viewSubmittedContractsUseCase = new ViewSubmittedContracts(userRepository);
const submitProjectUseCase = new SubmitProject(userRepository); 
const addToWishlistUseCase = new AddToWishlist(wishlistRepository); 
const getAllProposalsUseCase = new GetAllProposals(userRepository); 
const viewWalletUserUseCase = new ViewWalletUser(userRepository); 


const allClientsUseCase = new AllClients(userRepository); 



// Client Repo instance -------------->

const ClientRepository = new ClientRepositoryMongoose();
const ChatRepository = new ChatRepositoryMongoose();
const signupClientUseCase = new SignupClient(ClientRepository); 
const loginClientUseCase = new LoginClient(ClientRepository);
const getHomeClientUseCase = new getHomeClient(ClientRepository);
const logoutClientUseCase = new LogoutClient(ClientRepository);
const verifyClientUseCase = new verifyOtpClient(ClientRepository);
const verifyEmailClientUseCase = new VerifyEmailClient(ClientRepository);
const resetPasswordClientUseCase = new ResetPassword(ClientRepository);
const GoogleLoginClientUseCase = new GoogleLoginClient(ClientRepository);
const editClientProfileUseCase = new EditClientProfile(ClientRepository);
const getClientProfileUseCase = new GetClientProfile(ClientRepository);
const profileVerificationUseCase = new ProfileVerification(ClientRepository);
const createJobPostUseCase = new CreateJobPost(ClientRepository);
const getAllNotificationsUseCase = new GetAllNotifications(ClientRepository);
const listAllJobsClientUseCase = new ListAllJobsClient(ClientRepository);
const makePaymentUseCase = new MakePayment(ClientRepository);
const getUserProfileUseCase = new GetUserProfileClient(ClientRepository);
const getProposalsUseCase = new GetProposals(ClientRepository);
const getMyJobsUseCase = new GetMyJobs(ClientRepository);
const latestJobsUseCase = new LatestJobs(ClientRepository);
const createContractUseCase = new CreateContract(ClientRepository);
const rejectProposalUseCase = new RejectProposal(ClientRepository);
const myContractsUseCase = new MyContracts(ClientRepository);
const viewContractUseCase = new ViewContract(ClientRepository);
const viewSubmissionsUseCase = new ViewSubmissions(ClientRepository);
const closeContractUseCase = new CloseContract(ClientRepository);
const rateUserUseCase = new RateUser(ClientRepository);
const viewWalletUseCase = new ViewWallet(ClientRepository);
const getallDevelopersUseCase = new GetallDevelopers(ClientRepository);
const chatBotUseCase = new ChatBot(ClientRepository);
const sendMessageUseCase = new SendMessage(ChatRepository);
const getAllChatsUseCase = new GetAllChats(ChatRepository);
const viewChatUseCase = new ViewChat(ChatRepository);
 


// Admin repo intances ------->

const adminRepositary = new AdminRepository();
const loginAdminUseCase = new LoginAdmin(adminRepositary);
const getDashboardUseCase = new GetDashboard(adminRepositary);
const getAllUsersUseCase = new GetAllUsers(adminRepositary);
const getAllClientsUseCase = new GetAllClients(adminRepositary);
const blockUserUseCase = new BlockUser(adminRepositary);
const unBlockUserUseCase = new UnBlockUser(adminRepositary);
const blockClientUseCase = new BlockClient(adminRepositary);
const unBlockClientUseCase = new UnBlockClient(adminRepositary);
const viewRoleInfoUseCase = new ViewRoleInfo(adminRepositary);
const getWalletUseCase = new GetWallet(adminRepositary);
const searchUserUseCase = new SearchUser(adminRepositary);
const sortUserUseCase = new SortUser(adminRepositary);
const searchClientUseCase = new SearchClient(adminRepositary);
const sortClientUseCase = new SortClient(adminRepositary);
const verifyAcceptUseCase = new VerifyAccept(adminRepositary);
const getAllRequestsUseCase = new GetAllRequests(adminRepositary);
const getRequestedClientUseCase = new GetRequestedClient(adminRepositary);
 



// export all user usecases
export const allUserUseCases = {
        signupUseCase ,
        loginUseCase ,
        getHomeUseCase ,
        logoutUserUseCase ,
        verifyEmailUseCase ,
        resetPasswordUseCase ,
        verifyUserUseCase ,
        GoogleLoginUserUseCase ,
        editProfileUseCase ,
        getProfileUseCase ,
        listHomeJobsUseCase ,
        getSelectedJobsUseCase ,
        createProposalUseCase ,
        closeContractUseCase ,
        allContractsUseCase ,
        viewMyContractsUseCase ,
        viewSubmittedContractsUseCase ,
        allNotificationsUseCase ,
        boostAccountUseCase ,
        boostSuccessUseCase ,
        getSingleJobPostUseCase ,
        submitProjectUseCase ,
        chatBotUseCase,
        addToWishlistUseCase,
        getAllProposalsUseCase,
        viewWalletUserUseCase,

        allClientsUseCase,
};


// exports all Client Usecases ------->
export const allClientUseCases = {
     signupClientUseCase, 
     loginClientUseCase,
     getHomeClientUseCase,
     logoutClientUseCase,
     verifyClientUseCase,
     verifyEmailClientUseCase,
     resetPasswordClientUseCase,
     GoogleLoginClientUseCase,
     editClientProfileUseCase,
     getClientProfileUseCase,
     profileVerificationUseCase,
     createJobPostUseCase,
     getAllNotificationsUseCase,
     listAllJobsClientUseCase,
     makePaymentUseCase,
     getUserProfileUseCase,
     getProposalsUseCase,
     viewWalletUseCase,
     getMyJobsUseCase,
     latestJobsUseCase,
     createContractUseCase,
     rejectProposalUseCase,
     myContractsUseCase,
     viewContractUseCase,
     viewSubmissionsUseCase,
     getallDevelopersUseCase,
     closeContractUseCase,
     rateUserUseCase, 
     sendMessageUseCase,
     getAllChatsUseCase,
     viewChatUseCase,  
}



// exports all Admin usecases  ------->
export const allAdminUseCases = {
        adminRepositary , 
        getDashboardUseCase ,
        loginAdminUseCase,
        getAllUsersUseCase ,
        getAllClientsUseCase ,
        blockUserUseCase ,
        unBlockUserUseCase ,
        blockClientUseCase ,
        unBlockClientUseCase ,
        viewRoleInfoUseCase ,
        getWalletUseCase ,
        searchUserUseCase ,
        sortUserUseCase ,
        searchClientUseCase ,
        sortClientUseCase ,
        verifyAcceptUseCase ,
        getAllRequestsUseCase ,
        getRequestedClientUseCase 
}