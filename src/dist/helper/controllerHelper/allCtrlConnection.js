"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allAdminUseCases = exports.allClientUseCases = exports.allUserUseCases = void 0;
// User imports ---------------->
const signupUser_1 = require("../../application/usecases/user/signupUser");
const loginUser_1 = require("../../application/usecases/user/loginUser");
const GoogleLoginUser_1 = require("../../application/usecases/user/GoogleLoginUser");
const otpUser_1 = require("../../application/usecases/user/otpUser");
const verifyEmail_1 = require("../../application/usecases/user/verifyEmail");
const resetPassword_1 = require("../../application/usecases/user/resetPassword");
const getHome_1 = require("../../application/usecases/user/getHome");
const getHome_2 = require("../../application/usecases/user/getHome");
const viewProposals_1 = require("../../application/usecases/user/viewProposals");
const alterProfile_1 = require("../../application/usecases/user/alterProfile");
const getProfile_1 = require("../../application/usecases/user/getProfile");
const getSelectedJobs_1 = require("../../application/usecases/user/getSelectedJobs");
const createProposal_1 = require("../../application/usecases/user/createProposal");
const allNotifications_1 = require("../../application/usecases/user/allNotifications");
const boostPayment_1 = require("../../application/usecases/user/boostPayment");
const boostSuccess_1 = require("../../application/usecases/user/boostSuccess");
const getSingleJobPost_1 = require("../../application/usecases/user/getSingleJobPost");
const viewContracts_1 = require("../../application/usecases/user/viewContracts");
const sumbitProject_1 = require("../../application/usecases/user/sumbitProject");
const ChatBot_1 = require("../../application/usecases/user/ChatBot");
const addToWishlist_1 = require("../../application/usecases/user/addToWishlist");
const viewAllWishlist_1 = require("../../application/usecases/user/viewAllWishlist");
const removeFromWishlist_1 = require("../../application/usecases/user/removeFromWishlist");
const viewWalletUser_1 = require("../../application/usecases/user/viewWalletUser");
const getAllInvites_1 = require("../../application/usecases/user/getAllInvites");
const rejectInvite_1 = require("../../application/usecases/user/rejectInvite");
const viewSingleContract_1 = require("../../application/usecases/user/viewSingleContract");
const withdrawMoneyByUser_1 = require("../../application/usecases/user/withdrawMoneyByUser");
const searchJobs_1 = require("../../application/usecases/user/searchJobs");
const UserRepositoryMongoose_1 = require("../../domain/interfaces/Repositaries/UserRepositoryMongoose ");
// Client imports ----------------> 
const signupClient_1 = require("../../application/usecases/client/signupClient");
const loginClient_1 = require("../../application/usecases/client/loginClient");
const GoogleLoginClient_1 = require("../../application/usecases/client/GoogleLoginClient");
const ClientRepositoryMongoose_1 = require("../../domain/interfaces/Repositaries/ClientRepositoryMongoose");
const verifyEmail_2 = require("../../application/usecases/client/verifyEmail");
const verifyOtpClient_1 = require("../../application/usecases/client/verifyOtpClient");
const getHome_3 = require("../../application/usecases/client/getHome");
const getHome_4 = require("../../application/usecases/client/getHome");
const getSelectedJobs_2 = require("../../application/usecases/client/getSelectedJobs");
const viewContracts_2 = require("../../application/usecases/client/viewContracts");
const listAllJobs_1 = require("../../application/usecases/client/listAllJobs");
const EditClientProfile_1 = require("../../application/usecases/client/EditClientProfile");
const getProfile_2 = require("../../application/usecases/client/getProfile");
const profileVerification_1 = require("../../application/usecases/client/profileVerification");
const createJobPost_1 = require("../../application/usecases/client/createJobPost");
const getAllNotifications_1 = require("../../application/usecases/client/getAllNotifications");
const makePayment_1 = require("../../application/usecases/client/makePayment");
const getUserProfile_1 = require("../../application/usecases/client/getUserProfile");
const getProposals_1 = require("../../application/usecases/client/getProposals");
const createContract_1 = require("../../application/usecases/client/createContract");
const rejectProposal_1 = require("../../application/usecases/client/rejectProposal");
const viewSubmissions_1 = require("../../application/usecases/client/viewSubmissions");
const closeContract_1 = require("../../application/usecases/client/closeContract");
const rateAndReview_1 = require("../../application/usecases/client/rateAndReview");
const sendMessage_1 = require("../../application/usecases/client/sendMessage");
const getAllChats_1 = require("../../application/usecases/client/getAllChats");
const viewWallet_1 = require("../../application/usecases/client/viewWallet");
const viewChat_1 = require("../../application/usecases/client/viewChat");
const viewInvite_1 = require("../../application/usecases/client/viewInvite");
const getSingleJobPost_2 = require("../../application/usecases/client/getSingleJobPost");
const inviteUser_1 = require("../../application/usecases/client/inviteUser");
const searchDeveloper_1 = require("../../application/usecases/client/searchDeveloper");
const rejectContract_1 = require("../../application/usecases/client/rejectContract");
const getallDevelopers_1 = require("../../application/usecases/client/getallDevelopers");
const ChatRepository_1 = require("../../domain/interfaces/Repositaries/ChatRepository");
const WishlistRepository_1 = require("../../domain/interfaces/Repositaries/WishlistRepository");
// admin imports -----> 
const loginAdmin_1 = require("../../application/usecases/admin/loginAdmin");
const AdminRepository_1 = require("../../domain/interfaces/Repositaries/AdminRepository");
const getDashboard_1 = require("../../application/usecases/admin/getDashboard");
const getAllUsers_1 = require("../../application/usecases/admin/getAllUsers");
const getAllClients_1 = require("../../application/usecases/admin/getAllClients");
const blockRole_1 = require("../../application/usecases/admin/blockRole");
const unBlockRole_1 = require("../../application/usecases/admin/unBlockRole");
const viewWallet_2 = require("../../application/usecases/admin/viewWallet");
const successMoneyTransfer_1 = require("../../application/usecases/admin/successMoneyTransfer");
const getWithdrawRequests_1 = require("../../application/usecases/admin/getWithdrawRequests");
const viewContracts_3 = require("../../application/usecases/admin/viewContracts");
const viewSingleContract_2 = require("../..//application/usecases/admin/viewSingleContract");
const verifyAccept_1 = require("../../application/usecases/admin/verifyAccept");
const getAllRequests_1 = require("../../application/usecases/admin/getAllRequests");
const getRequestedClient_1 = require("../../application/usecases/admin/getRequestedClient");
const viewRoleInfo_1 = require("../../application/usecases/admin/viewRoleInfo");
const getWallet_1 = require("../../application/usecases/admin/getWallet");
const sortUser_1 = require("../../application/usecases/admin/sortUser");
const sortClient_1 = require("../../application/usecases/admin/sortClient");
// User Respo instance  ---------->
const userRepository = new UserRepositoryMongoose_1.UserRepositoryMongoose();
const wishlistRepository = new WishlistRepository_1.WishlistRepositoryMongoose();
const signupUseCase = new signupUser_1.SignupUser(userRepository);
const loginUseCase = new loginUser_1.LoginUser(userRepository);
const getHomeUseCase = new getHome_1.getHomeUser(userRepository);
const verifyEmailUseCase = new verifyEmail_1.VerifyEmail(userRepository);
const resetPasswordUseCase = new resetPassword_1.ResetPassword(userRepository);
const verifyUserUseCase = new otpUser_1.VerifyOtp(userRepository);
const GoogleLoginUserUseCase = new GoogleLoginUser_1.GoogleLoginUser(userRepository);
const alterProfileUseCase = new alterProfile_1.AlterUserProfile(userRepository);
const getProfileUseCase = new getProfile_1.GetUserProfile(userRepository);
const listHomeJobsUseCase = new getHome_2.ListHomeJobs(userRepository);
const getSelectedJobsUseCase = new getSelectedJobs_1.GetSelectedJobs(userRepository);
const viewProposalsUseCase = new viewProposals_1.ViewProposals(userRepository);
const createProposalUseCase = new createProposal_1.CreateProposal(userRepository);
const allNotificationsUseCase = new allNotifications_1.AllNotifications(userRepository);
const boostAccountUseCase = new boostPayment_1.BoostPayment(userRepository);
const boostSuccessUseCase = new boostSuccess_1.BoostSuccess(userRepository);
const getSingleJobPostUseCase = new getSingleJobPost_1.GetSingleJobPost(userRepository);
const viewContractsUseCase = new viewContracts_1.ViewContracts(userRepository);
const submitProjectUseCase = new sumbitProject_1.SubmitProject(userRepository);
const addToWishlistUseCase = new addToWishlist_1.AddToWishlist(wishlistRepository);
const viewAllWishlistUseCase = new viewAllWishlist_1.ViewAllWishlist(wishlistRepository);
const removeFromWishlistUseCase = new removeFromWishlist_1.RemoveFromWishlist(wishlistRepository);
const viewWalletUserUseCase = new viewWalletUser_1.ViewWalletUser(userRepository);
const getAllInvitesUseCase = new getAllInvites_1.GetAllInvites(userRepository);
const rejectInviteUseCase = new rejectInvite_1.RejectInvite(userRepository);
const searchJobsUseCase = new searchJobs_1.SearchJobs(userRepository);
const viewSingleContractUserUseCase = new viewSingleContract_1.ViewSingleContractUser(userRepository);
const withdrawMoneyByUserUseCase = new withdrawMoneyByUser_1.WithdrawMoneyByUser(userRepository);
// Client Repo instance -------------->  
const ClientRepository = new ClientRepositoryMongoose_1.ClientRepositoryMongoose();
const ChatRepository = new ChatRepository_1.ChatRepositoryMongoose();
const signupClientUseCase = new signupClient_1.SignupClient(ClientRepository);
const loginClientUseCase = new loginClient_1.LoginClient(ClientRepository);
const verifyClientUseCase = new verifyOtpClient_1.verifyOtpClient(ClientRepository);
const verifyEmailClientUseCase = new verifyEmail_2.VerifyEmailClient(ClientRepository);
const resetPasswordClientUseCase = new resetPassword_1.ResetPassword(ClientRepository);
const GoogleLoginClientUseCase = new GoogleLoginClient_1.GoogleLoginClient(ClientRepository);
const getHomeClientUseCase = new getHome_3.getHomeClient(ClientRepository);
const trendingJobsUseCase = new getHome_4.TrendingJobs(ClientRepository);
const getSelectedJobsClientUseCase = new getSelectedJobs_2.GetSelectedJobsClient(ClientRepository);
const viewContractsClientUseCase = new viewContracts_2.ViewContractsClient(ClientRepository);
const listAllJobsClientUseCase = new listAllJobs_1.ListAllJobs(ClientRepository);
const editClientProfileUseCase = new EditClientProfile_1.EditClientProfile(ClientRepository);
const getClientProfileUseCase = new getProfile_2.GetClientProfile(ClientRepository);
const profileVerificationUseCase = new profileVerification_1.ProfileVerification(ClientRepository);
const createJobPostUseCase = new createJobPost_1.CreateJobPost(ClientRepository);
const getAllNotificationsUseCase = new getAllNotifications_1.GetAllNotifications(ClientRepository);
const makePaymentUseCase = new makePayment_1.MakePayment(ClientRepository);
const getUserProfileUseCase = new getUserProfile_1.GetUserProfileClient(ClientRepository);
const getProposalsUseCase = new getProposals_1.GetProposals(ClientRepository);
const createContractUseCase = new createContract_1.CreateContract(ClientRepository);
const rejectProposalUseCase = new rejectProposal_1.RejectProposal(ClientRepository);
const viewInviteUseCase = new viewInvite_1.ViewInviteClient(ClientRepository);
const getSingleJobPostClientUseCase = new getSingleJobPost_2.GetSingleJobPostClient(ClientRepository);
const viewSubmissionsUseCase = new viewSubmissions_1.ViewSubmissions(ClientRepository);
const closeContractUseCase = new closeContract_1.CloseContract(ClientRepository);
const rateAndReviewUserUseCase = new rateAndReview_1.RateAndReview(ClientRepository);
const viewWalletUseCase = new viewWallet_1.ViewWallet(ClientRepository);
const searchDeveloperUseCase = new searchDeveloper_1.SearchDeveloper(ClientRepository);
const getallDevelopersUseCase = new getallDevelopers_1.GetallDevelopers(ClientRepository);
const inviteUserUseCase = new inviteUser_1.InviteUser(ClientRepository);
const rejectContractUseCase = new rejectContract_1.RejectContract(ClientRepository);
const chatBotUseCase = new ChatBot_1.ChatBot(ClientRepository);
const sendMessageUseCase = new sendMessage_1.SendMessage(ChatRepository);
const getAllChatsUseCase = new getAllChats_1.GetAllChats(ChatRepository);
const viewChatUseCase = new viewChat_1.ViewChat(ChatRepository);
// Admin repo intances -------> 
const adminRepository = new AdminRepository_1.AdminRepository();
const loginAdminUseCase = new loginAdmin_1.LoginAdmin(adminRepository);
const clientMetricsUseCase = new getDashboard_1.ClientMetrics(adminRepository);
const userMetricsUseCase = new getDashboard_1.UserMetrics(adminRepository);
const getRevenueUseCase = new getDashboard_1.GetRevenue(adminRepository);
const getAllUsersUseCase = new getAllUsers_1.GetAllUsers(adminRepository);
const getAllClientsUseCase = new getAllClients_1.GetAllClients(adminRepository);
const blockUserUseCase = new blockRole_1.BlockUser(adminRepository);
const unBlockUserUseCase = new unBlockRole_1.UnBlockUser(adminRepository);
const blockClientUseCase = new blockRole_1.BlockClient(adminRepository);
const viewWalletAdminUseCase = new viewWallet_2.ViewWalletAdmin(adminRepository);
const successMoneyTransferUseCase = new successMoneyTransfer_1.SuccessMoneyTransfer(adminRepository);
const getWithdrawRequestsUseCase = new getWithdrawRequests_1.GetWithdrawRequests(adminRepository);
const viewContractsAdminUseCase = new viewContracts_3.ViewContractsAdmin(adminRepository);
const viewSingleContractAdminUseCase = new viewSingleContract_2.ViewSingleContractAdmin(adminRepository);
const unBlockClientUseCase = new unBlockRole_1.UnBlockClient(adminRepository);
const viewRoleInfoUseCase = new viewRoleInfo_1.ViewRoleInfo(adminRepository);
const getWalletUseCase = new getWallet_1.GetWallet(adminRepository);
const sortUserUseCase = new sortUser_1.SortUser(adminRepository);
const sortClientUseCase = new sortClient_1.SortClient(adminRepository);
const verifyAcceptUseCase = new verifyAccept_1.VerifyAccept(adminRepository);
const getAllRequestsUseCase = new getAllRequests_1.GetAllRequests(adminRepository);
const getRequestedClientUseCase = new getRequestedClient_1.GetRequestedClient(adminRepository);
// export all user usecases
exports.allUserUseCases = {
    signupUseCase,
    loginUseCase,
    getHomeUseCase,
    verifyEmailUseCase,
    resetPasswordUseCase,
    verifyUserUseCase,
    GoogleLoginUserUseCase,
    alterProfileUseCase,
    getProfileUseCase,
    listHomeJobsUseCase,
    getSelectedJobsUseCase,
    createProposalUseCase,
    closeContractUseCase,
    viewContractsUseCase,
    allNotificationsUseCase,
    boostAccountUseCase,
    boostSuccessUseCase,
    getSingleJobPostUseCase,
    submitProjectUseCase,
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
exports.allClientUseCases = {
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
exports.allAdminUseCases = {
    adminRepository,
    clientMetricsUseCase,
    userMetricsUseCase,
    getRevenueUseCase,
    loginAdminUseCase,
    getAllUsersUseCase,
    getAllClientsUseCase,
    blockUserUseCase,
    unBlockUserUseCase,
    blockClientUseCase,
    unBlockClientUseCase,
    viewWalletAdminUseCase,
    successMoneyTransferUseCase,
    getWithdrawRequestsUseCase,
    viewContractsAdminUseCase,
    viewSingleContractAdminUseCase,
    viewRoleInfoUseCase,
    getWalletUseCase,
    sortUserUseCase,
    sortClientUseCase,
    verifyAcceptUseCase,
    getAllRequestsUseCase,
    getRequestedClientUseCase,
};
