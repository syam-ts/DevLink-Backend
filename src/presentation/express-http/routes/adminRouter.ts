import express, { Router } from "express";
import { adminController } from "../../controllers/adminCtrl";
import { verifyToken } from "../../middleware/auth/verifyToken";
import refreshToken from "../../middleware/auth/refreshToken";
import { requireRole } from "../../middleware/auth/requireRole";
import { allRoles } from "../../../helper/constants/enums";

const {
    getDashboard,
    getAllUsers,
    getAllClients,
    viewWallet,
    loginAdmin,
    successMoneyTransfer,
    viewContracts,
    getRequests,
    getRequestedClient,
    viewRoleInfo,
    getWallet,
    logoutAdmin,
    sortClient,
    verifyAccept,
    blockUser,
    unBlockUser,
    blockClient,
    unBlockClient,
    getAllContracts,
    viewSingleContract,
    getWithdrawRequests,
} = adminController;
const { ADMIN }: { ADMIN: string } = allRoles;

class AdminRoute {
    public router: Router;
    constructor() {
        this.router = Router();

        this.initializeGetRoutes();
        this.initializePostRoutes();
        this.initializePutAndPatchRoutes()
    }

    initializeGetRoutes(): void {
        this.router.get(
            "/getDashboard/:range",
            verifyToken,
            requireRole(ADMIN),
            getDashboard
        );
        this.router.get(
            "/getAllUsers",
            verifyToken,
            requireRole(ADMIN),
            getAllUsers
        );
        this.router.get(
            "/getAllClients",
            verifyToken,
            requireRole(ADMIN),
            getAllClients
        );
        this.router.get("/wallet", verifyToken, requireRole(ADMIN), viewWallet);
        this.router.get(
            "/getRequests",
            verifyToken,
            requireRole(ADMIN),
            getRequests
        );
        this.router.get(
            "/getWithdrawRequests",
            verifyToken,
            requireRole(ADMIN),
            getWithdrawRequests
        );

        this.router.get(
            "/viewContracts",
            verifyToken,
            requireRole(ADMIN),
            viewContracts
        );
        this.router.get(
            "/contract/:contractId",
            verifyToken,
            requireRole(ADMIN),
            viewContracts
        );
        this.router.get("/revenue", verifyToken, requireRole(ADMIN), viewContracts);
        this.router.get(
            "/userMetrics",
            verifyToken,
            requireRole(ADMIN),
            viewContracts
        );
        this.router.get(
            "/clientMetrics",
            verifyToken,
            requireRole(ADMIN),
            viewContracts
        );
        this.router.get(
            "/request/getRequestedClient/:clientId",
            getRequestedClient
        );
        this.router.get("/viewRole/:roleId/:roleInfo", viewRoleInfo);
        this.router.get("/getWallet", verifyToken, requireRole(ADMIN), getWallet);
        this.router.get(
            "/getAllContracts",
            verifyToken,
            requireRole(ADMIN),
            getAllContracts
        );
        this.router.get(
            "/viewSingleContract/:contractId",
            verifyToken,
            requireRole(ADMIN),
            viewSingleContract
        );
    }
    initializePostRoutes(): void {
        // this.router.post('/signup', adminController.signUpAdmin);
        this.router.post("/login", loginAdmin);
        this.router.post("/logout", logoutAdmin);
        this.router.post("/refresh-token", refreshToken);
        this.router.post(
            "/getAllClients/sort?",
            verifyToken,
            requireRole(ADMIN),
            sortClient
        );
        this.router.post(
            "/successMoneyTransfer",
            verifyToken,
            requireRole(ADMIN),
            successMoneyTransfer
        );
    }

    initializePutAndPatchRoutes(): void {
        this.router.put(
            "/verifyClient/accept",
            verifyToken,
            requireRole(ADMIN),
            verifyAccept
        );
        this.router.patch(
            "/blockUser/:userId",
            verifyToken,
            requireRole(ADMIN),
            blockUser
        );
        this.router.patch(
            "/unBlockUser/:userId",
            verifyToken,
            requireRole(ADMIN),
            unBlockUser
        );
        this.router.patch(
            "/blockClient/:clientId",
            verifyToken,
            requireRole(ADMIN),
            blockClient
        );
        this.router.patch(
            "/unBlockClient/:clientId",
            verifyToken,
            requireRole(ADMIN),
            unBlockClient
        );
    }
}

export default AdminRoute;
