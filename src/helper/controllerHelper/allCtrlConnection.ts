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
import { BestMatches } from "../../application/usecases/user/bestMatches";
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
import { MyContracts } from '../../application/usecases/client/myContracts'; 
import { ViewContract } from '../../application/usecases/client/viewContract';
import { ViewSubmissions } from '../../application/usecases/client/viewSubmissions';
import { CloseContract } from '../../application/usecases/client/closeContract';
import { RateUser } from '../../application/usecases/client/rateUser';
import { CreateChat } from '../../application/usecases/client/createChat';
import { SendMessage } from '../../application/usecases/client/sendMessage';
import { GetAllChats } from '../../application/usecases/client/getAllChats';
import { ViewChat } from '../../application/usecases/client/viewChat';
import { ChatRepositoryMongoose } from "../../domain/interfaces/Repositaries/ChatRepository";



// User Respo instance  ---------->


const userRepository = new UserRepositoryMongoose();
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
const bestMatchesUseCase = new BestMatches(userRepository);
const createProposalUseCase = new CreateProposal(userRepository); 
const allContractsUseCase = new AllContracts(userRepository);
const allNotificationsUseCase = new AllNotifications(userRepository);
const boostAccountUseCase = new BoostPayment(userRepository);
const boostSuccessUseCase = new BoostSuccess(userRepository);
const getSingleJobPostUseCase = new GetSingleJobPost(userRepository);
const viewMyContractsUseCase = new ViewMyContracts(userRepository);
const viewSubmittedContractsUseCase = new ViewSubmittedContracts(userRepository);
const submitProjectUseCase = new SubmitProject(userRepository); 



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
const myContractsUseCase = new MyContracts(ClientRepository);
const viewContractUseCase = new ViewContract(ClientRepository);
const viewSubmissionsUseCase = new ViewSubmissions(ClientRepository);
const closeContractUseCase = new CloseContract(ClientRepository);
const rateUserUseCase = new RateUser(ClientRepository);
const chatBotUseCase = new ChatBot(ClientRepository);
const createChatUseCase = new CreateChat(ChatRepository);
const sendMessageUseCase = new SendMessage(ChatRepository);
const getAllChatsUseCase = new GetAllChats(ChatRepository);
const viewChatUseCase = new ViewChat(ChatRepository);



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
        bestMatchesUseCase ,
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
        chatBotUseCase
};


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
     getMyJobsUseCase,
     latestJobsUseCase,
     createContractUseCase,
     myContractsUseCase,
     viewContractUseCase,
     viewSubmissionsUseCase,
     closeContractUseCase,
     rateUserUseCase,
     createChatUseCase,
     sendMessageUseCase,
     getAllChatsUseCase,
     viewChatUseCase,
}
