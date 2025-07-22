import { Router } from "express";
import { AdminController } from "../../controllers/adminCtrl";
import { verifyToken } from "../../middleware/auth/verifyToken";
import refreshToken from "../../middleware/auth/refreshToken";
import { requireRole } from "../../middleware/auth/requireRole";
import { allRoles } from "../../../helper/constants/enums";

const { ADMIN }: { ADMIN: string } = allRoles;

class AdminRoute {

    public router: Router;
    private adminController: AdminController;
    constructor() {

        this.router = Router();
        this.adminController = new AdminController();
        this.initializeGetRoutes();
        this.initializePostRoutes();
        this.initializePutAndPatchRoutes()
    }

    initializeGetRoutes(): void {
        this.router.get("/getDashboard/:range", verifyToken, requireRole(ADMIN), this.adminController.getDashboard);
        this.router.get("/getAllUsers", verifyToken, requireRole(ADMIN), this.adminController.getAllUsers);
        this.router.get("/getAllClients", verifyToken, requireRole(ADMIN), this.adminController.getAllClients);
        this.router.get("/wallet", verifyToken, requireRole(ADMIN), this.adminController.viewWallet);
        this.router.get("/getRequests", verifyToken, requireRole(ADMIN), this.adminController.getRequests);
        this.router.get("/getWithdrawRequests", verifyToken, requireRole(ADMIN), this.adminController.getWithdrawRequests);
        this.router.get("/viewContracts", verifyToken, requireRole(ADMIN), this.adminController.viewContracts);
        this.router.get("/contract/:contractId", verifyToken, requireRole(ADMIN), this.adminController.viewContracts);
        this.router.get("/revenue", verifyToken, requireRole(ADMIN), this.adminController.viewContracts);
        this.router.get("/userMetrics", verifyToken, requireRole(ADMIN), this.adminController.viewContracts);
        this.router.get("/clientMetrics", verifyToken, requireRole(ADMIN), this.adminController.viewContracts);
        this.router.get("/request/getRequestedClient/:clientId", this.adminController.getRequestedClient);
        this.router.get("/viewRole/:roleId/:roleInfo", this.adminController.viewRoleInfo);
        this.router.get("/getWallet", verifyToken, requireRole(ADMIN), this.adminController.getWallet);
        this.router.get("/getAllContracts", verifyToken, requireRole(ADMIN), this.adminController.getAllContracts);
        this.router.get("/viewSingleContract/:contractId", verifyToken, requireRole(ADMIN), this.adminController.viewSingleContract);
    }


    initializePostRoutes(): void {
        // this.router.post('/signup', adminController.signUpAdmin);
        this.router.post("/login", this.adminController.loginAdmin);
        this.router.post("/logout", this.adminController.logoutAdmin);
        this.router.post("/refresh-token", refreshToken);
        this.router.post("/getAllClients/sort?", verifyToken, requireRole(ADMIN), this.adminController.sortClient);
        this.router.post("/successMoneyTransfer", verifyToken, requireRole(ADMIN), this.adminController.successMoneyTransfer);
    }


    initializePutAndPatchRoutes(): void {
        this.router.put("/verifyClient/accept", verifyToken, requireRole(ADMIN), this.adminController.verifyAccept);
        this.router.patch("/blockUser/:userId", verifyToken, requireRole(ADMIN), this.adminController.blockUser);
        this.router.patch("/unBlockUser/:userId", verifyToken, requireRole(ADMIN), this.adminController.unBlockUser);
        this.router.patch("/blockClient/:clientId", verifyToken, requireRole(ADMIN), this.adminController.blockClient);
        this.router.patch("/unBlockClient/:clientId", verifyToken, requireRole(ADMIN), this.adminController.unBlockClient);
    }
}

export default AdminRoute;
