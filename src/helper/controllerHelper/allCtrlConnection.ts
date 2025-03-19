// User imports ---------------->
import { SignupUser } from "../../application/usecases/user/signupUser";
import { LoginUser } from "../../application/usecases/user/loginUser";
import { GoogleLoginUser } from "../../application/usecases/user/GoogleLoginUser";
import { verifyOtp } from "../../application/usecases/user/otpUser";
import { VerifyEmail } from "../../application/usecases/user/verifyEmail";
import { ResetPassword } from "../../application/usecases/user/resetPassword";
import { getHomeUser } from "../../application/usecases/user/getHome";
import { ListHomeJobs } from "../../application/usecases/user/getHome"; 
import { ViewProposals } from "../../application/usecases/user/viewProposals";  
import { AlterUserProfile } from "../../application/usecases/user/alterProfile"; 
import { GetUserProfile } from "../../application/usecases/user/getProfile";
import { GetSelectedJobs } from "../../application/usecases/user/getSelectedJobs";
import { CreateProposal } from "../../application/usecases/user/createProposal";   
import { AllNotifications } from "../../application/usecases/user/allNotifications"; 
import { BoostPayment } from "../../application/usecases/user/boostPayment"; 
import { BoostSuccess } from "../../application/usecases/user/boostSuccess"; 
import { GetSingleJobPost } from "../../application/usecases/user/getSingleJobPost"; 
import { ViewContracts } from "../../application/usecases/user/viewContracts";  
import { SubmitProject } from "../../application/usecases/user/sumbitProject";  
import { ChatBot } from "../../application/usecases/user/ChatBot";   
import { AddToWishlist } from "../../application/usecases/user/addToWishlist";   
import { ViewAllWishlist } from "../../application/usecases/user/viewAllWishlist";   
import { RemoveFromWishlist } from "../../application/usecases/user/removeFromWishlist";   
import { ViewWalletUser } from "../../application/usecases/user/viewWalletUser"; 
import { GetAllInvites } from "../../application/usecases/user/getAllInvites"; 
import { RejectInvite } from "../../application/usecases/user/rejectInvite"; 
import { ViewSingleContractUser } from "../../application/usecases/user/viewSingleContract"; 
import { WithdrawMoneyByUser } from "../../application/usecases/user/withdrawMoneyByUser"; 
import { SearchJobs } from "../../application/usecases/user/searchJobs"; 
import { UserRepositoryMongoose } from "../../domain/interfaces/Repositaries/UserRepositoryMongoose ";
 
// Client imports ----------------> 
import { SignupClient } from '../../application/usecases/client/signupClient';
import { LoginClient } from '../../application/usecases/client/loginClient';
import { GoogleLoginClient } from '../../application/usecases/client/GoogleLoginClient';
import { ClientRepositoryMongoose } from '../../domain/interfaces/Repositaries/ClientRepositoryMongoose';   
import { VerifyEmailClient } from '../../application/usecases/client/verifyEmail';
import { ResetPasswordClient } from '../../application/usecases/client/resetPassword';
import { verifyOtpClient } from '../../application/usecases/client/verifyOtpClient';
import { getHomeClient } from '../../application/usecases/client/getHome';
import { TrendingJobs } from '../../application/usecases/client/getHome';
import { GetSelectedJobsClient } from '../../application/usecases/client/getSelectedJobs';
import { ViewContractsClient } from '../../application/usecases/client/viewContracts';
import { ListAllJobs } from '../../application/usecases/client/listAllJobs';  
import { EditClientProfile } from '../../application/usecases/client/EditClientProfile';
import { GetClientProfile } from '../../application/usecases/client/getProfile';
import { ProfileVerification } from '../../application/usecases/client/profileVerification';
import { CreateJobPost } from '../../application/usecases/client/createJobPost';
import { GetAllNotifications } from '../../application/usecases/client/getAllNotifications'; 
import { MakePayment } from '../../application/usecases/client/makePayment';
import { GetUserProfileClient } from '../../application/usecases/client/getUserProfile';
import { GetProposals } from '../../application/usecases/client/getProposals'; 
import { CreateContract } from '../../application/usecases/client/createContract';
import { RejectProposal } from '../../application/usecases/client/rejectProposal'; 
import { ViewSubmissions } from '../../application/usecases/client/viewSubmissions';
import { CloseContract } from '../../application/usecases/client/closeContract';
import { RateAndReview } from '../../application/usecases/client/rateAndReview';
import { CreateChat } from '../../application/usecases/client/createChat';
import { SendMessage } from '../../application/usecases/client/sendMessage';
import { GetAllChats } from '../../application/usecases/client/getAllChats';
import { ViewWallet } from '../../application/usecases/client/viewWallet'; 
import { ViewChat } from '../../application/usecases/client/viewChat';
import { ViewInviteClient } from '../../application/usecases/client/viewInvite';
import { GetSingleJobPostClient } from '../../application/usecases/client/getSingleJobPost';
import { InviteUser } from '../../application/usecases/client/inviteUser';
import { SearchDeveloper } from '../../application/usecases/client/searchDeveloper';
import { RejectContract } from '../../application/usecases/client/rejectContract';
import { GetallDevelopers } from '../../application/usecases/client/getallDevelopers';
import { ChatRepositoryMongoose } from "../../domain/interfaces/Repositaries/ChatRepository";
import { WishlistRepositoryMongoose } from "../../domain/interfaces/Repositaries/WishlistRepository";
  
// admin imports -----> 
import { LoginAdmin } from '../../application/usecases/admin/loginAdmin';
import { AdminRepository } from '../../domain/interfaces/Repositaries/AdminRepository';
import { GetDashboard } from '../../application/usecases/admin/getDashboard';
import { GetAllUsers } from '../../application/usecases/admin/getAllUsers';
import { GetAllClients } from '../../application/usecases/admin/getAllClients';
import { BlockUser, BlockClient } from '../../application/usecases/admin/blockRole';
import { UnBlockUser, UnBlockClient } from '../../application/usecases/admin/unBlockRole'; 
import { ViewWalletAdmin } from '../../application/usecases/admin/viewWallet'; 
import { SuccessMoneyTransfer } from '../../application/usecases/admin/successMoneyTransfer'; 
import { GetWithdrawRequests } from '../../application/usecases/admin/getWithdrawRequests'; 
import { ViewContractsAdmin } from '../../application/usecases/admin/viewContracts'; 
import { ViewSingleContractAdmin } from '../..//application/usecases/admin/viewSingleContract';  


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
const verifyEmailUseCase = new VerifyEmail(userRepository);
const resetPasswordUseCase = new ResetPassword(userRepository);
const verifyUserUseCase = new verifyOtp(userRepository);
const GoogleLoginUserUseCase = new GoogleLoginUser(userRepository);
const alterProfileUseCase = new AlterUserProfile(userRepository);
const getProfileUseCase = new GetUserProfile(userRepository);
const listHomeJobsUseCase = new ListHomeJobs(userRepository);
const getSelectedJobsUseCase = new GetSelectedJobs(userRepository);
const viewProposalsUseCase = new ViewProposals(userRepository); 
const createProposalUseCase = new CreateProposal(userRepository);  
const allNotificationsUseCase = new AllNotifications(userRepository);
const boostAccountUseCase = new BoostPayment(userRepository);
const boostSuccessUseCase = new BoostSuccess(userRepository);
const getSingleJobPostUseCase = new GetSingleJobPost(userRepository);
const viewContractsUseCase = new ViewContracts(userRepository); 
const submitProjectUseCase = new SubmitProject(userRepository); 
const addToWishlistUseCase = new AddToWishlist(wishlistRepository); 
const viewAllWishlistUseCase = new ViewAllWishlist(wishlistRepository); 
const removeFromWishlistUseCase = new RemoveFromWishlist(wishlistRepository); 
const viewWalletUserUseCase = new ViewWalletUser(userRepository); 
const getAllInvitesUseCase = new GetAllInvites(userRepository); 
const rejectInviteUseCase = new RejectInvite(userRepository); 
const searchJobsUseCase = new SearchJobs(userRepository); 
const viewSingleContractUserUseCase = new ViewSingleContractUser(userRepository); 
const withdrawMoneyByUserUseCase =  new WithdrawMoneyByUser(userRepository);
  
// Client Repo instance -------------->  
const ClientRepository = new ClientRepositoryMongoose();
const ChatRepository = new ChatRepositoryMongoose();
const signupClientUseCase = new SignupClient(ClientRepository); 
const loginClientUseCase = new LoginClient(ClientRepository); 
const verifyClientUseCase = new verifyOtpClient(ClientRepository);
const verifyEmailClientUseCase = new VerifyEmailClient(ClientRepository);
const resetPasswordClientUseCase = new ResetPassword(ClientRepository);
const GoogleLoginClientUseCase = new GoogleLoginClient(ClientRepository);
const getHomeClientUseCase = new getHomeClient(ClientRepository);
const trendingJobsUseCase = new TrendingJobs(ClientRepository);
const getSelectedJobsClientUseCase = new GetSelectedJobsClient(ClientRepository);
const viewContractsClientUseCase = new ViewContractsClient(ClientRepository);
const listAllJobsClientUseCase = new ListAllJobs(ClientRepository); 
const editClientProfileUseCase = new EditClientProfile(ClientRepository);
const getClientProfileUseCase = new GetClientProfile(ClientRepository);
const profileVerificationUseCase = new ProfileVerification(ClientRepository);
const createJobPostUseCase = new CreateJobPost(ClientRepository);
const getAllNotificationsUseCase = new GetAllNotifications(ClientRepository); 
const makePaymentUseCase = new MakePayment(ClientRepository);
const getUserProfileUseCase = new GetUserProfileClient(ClientRepository);
const getProposalsUseCase = new GetProposals(ClientRepository); 
const createContractUseCase = new CreateContract(ClientRepository);
const rejectProposalUseCase = new RejectProposal(ClientRepository); 
const viewInviteUseCase = new ViewInviteClient(ClientRepository); 
const getSingleJobPostClientUseCase = new GetSingleJobPostClient(ClientRepository); 
const viewSubmissionsUseCase = new ViewSubmissions(ClientRepository);
const closeContractUseCase = new CloseContract(ClientRepository);
const rateAndReviewUserUseCase = new RateAndReview(ClientRepository);
const viewWalletUseCase = new ViewWallet(ClientRepository);
const searchDeveloperUseCase = new SearchDeveloper(ClientRepository);
const getallDevelopersUseCase = new GetallDevelopers(ClientRepository);
const inviteUserUseCase = new InviteUser(ClientRepository);
const rejectContractUseCase = new RejectContract(ClientRepository);
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
const viewWalletAdminUseCase = new ViewWalletAdmin(adminRepositary); 
const successMoneyTransferUseCase = new SuccessMoneyTransfer(adminRepositary); 
const getWithdrawRequestsUseCase = new GetWithdrawRequests(adminRepositary); 
const viewContractsAdminUseCase = new ViewContractsAdmin(adminRepositary); 
const viewSingleContractAdminUseCase = new ViewSingleContractAdmin(adminRepositary); 




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
        verifyEmailUseCase ,
        resetPasswordUseCase ,
        verifyUserUseCase ,
        GoogleLoginUserUseCase ,
        alterProfileUseCase ,
        getProfileUseCase ,
        listHomeJobsUseCase ,
        getSelectedJobsUseCase ,
        createProposalUseCase ,
        closeContractUseCase , 
        viewContractsUseCase , 
        allNotificationsUseCase ,
        boostAccountUseCase ,
        boostSuccessUseCase ,
        getSingleJobPostUseCase ,
        submitProjectUseCase ,
        chatBotUseCase, 
        addToWishlistUseCase,
        viewAllWishlistUseCase,
        removeFromWishlistUseCase,
        viewProposalsUseCase,
        viewWalletUserUseCase,
        getAllInvitesUseCase,
        rejectInviteUseCase,
        searchJobsUseCase,
        viewSingleContractUserUseCase, 
        withdrawMoneyByUserUseCase,
}; 

// exports all Client Usecases ------->
export const allClientUseCases = {
     signupClientUseCase, 
     loginClientUseCase, 
     verifyClientUseCase,
     verifyEmailClientUseCase,
     resetPasswordClientUseCase,
     GoogleLoginClientUseCase,
     getHomeClientUseCase,
     trendingJobsUseCase,
     getSelectedJobsClientUseCase,
     viewContractsClientUseCase,
     listAllJobsClientUseCase,
     editClientProfileUseCase,
     getClientProfileUseCase,
     profileVerificationUseCase,
     createJobPostUseCase,
     getAllNotificationsUseCase, 
     makePaymentUseCase,
     getUserProfileUseCase,
     getProposalsUseCase,
     viewWalletUseCase, 
     createContractUseCase,
     rejectProposalUseCase, 
     viewInviteUseCase,
     viewSubmissionsUseCase,
     getallDevelopersUseCase,
     getSingleJobPostClientUseCase,
     closeContractUseCase,
     searchDeveloperUseCase,
     rateAndReviewUserUseCase, 
     inviteUserUseCase, 
     rejectContractUseCase, 
     sendMessageUseCase,
     getAllChatsUseCase,
     viewChatUseCase,  
}; 

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
        unBlockClientUseCase, 
        viewWalletAdminUseCase, 
        successMoneyTransferUseCase, 
        getWithdrawRequestsUseCase, 
        viewContractsAdminUseCase,   
        viewSingleContractAdminUseCase,   
        viewRoleInfoUseCase ,
        getWalletUseCase ,
        searchUserUseCase ,
        sortUserUseCase ,
        searchClientUseCase ,
        sortClientUseCase ,
        verifyAcceptUseCase ,
        getAllRequestsUseCase ,
        getRequestedClientUseCase,  
};