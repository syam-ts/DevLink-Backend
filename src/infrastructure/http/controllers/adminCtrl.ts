import { LoginAdmin } from '../../../application/usecases/admin/loginAdmin';
import { AdminRepository } from '../../../domain/interfaces/Repositaries/AdminRepository';
import { GetDashboard } from '../../../application/usecases/admin/getDashboard';
import { GetAllUsers } from '../../../application/usecases/admin/getAllUsers';
import { GetAllClients } from '../../../application/usecases/admin/getAllClients';
import { BlockUser, BlockClient } from '../../../application/usecases/admin/blockRole';
import { UnBlockUser, UnBlockClient } from '../../../application/usecases/admin/unBlockRole';
import { Create } from '../../../application/usecases/admin/create';
import { VerifyAccept } from '../../../application/usecases/admin/verifyAccept';
import { GetAllRequests } from '../../../application/usecases/admin/getAllRequests';
import { GetRequestedClient } from '../../../application/usecases/admin/getRequestedClient';
import { ViewRoleInfo } from '../../../application/usecases/admin/viewRoleInfo';
import { GetWallet } from '../../../application/usecases/admin/getWallet';


const adminRepositary = new AdminRepository();
const loginUseCase = new LoginAdmin(adminRepositary);
const getDashboardUseCase = new GetDashboard(adminRepositary);
const getAllUsersUseCase = new GetAllUsers(adminRepositary);
const getAllClientsUseCase = new GetAllClients(adminRepositary);
const blockUserUseCase = new BlockUser(adminRepositary);
const unBlockUserUseCase = new UnBlockUser(adminRepositary);
const blockClientUseCase = new BlockClient(adminRepositary);
const unBlockClientUseCase = new UnBlockClient(adminRepositary);
const viewRoleInfoUseCase = new ViewRoleInfo(adminRepositary);
const getWalletUseCase = new GetWallet(adminRepositary);



const verifyAcceptUseCase = new VerifyAccept(adminRepositary);
const getAllRequestsUseCase = new GetAllRequests(adminRepositary);
const getRequestedClientUseCase = new GetRequestedClient(adminRepositary);
// const create = new Create(adminRepositary);


export const adminController = {
     
    
    // signUpAdmin: async(req: any, res: any) => {
    //     try{
    //         const adminId: string = '676bfa326c2e4c9fc3afba8e'

    //         const users = await create.execute(adminId); 

    //         res.json({message: "Successfully fetched all the users", data: users, type: 'success'});
            
    //     }catch(err: any) {
    //         res.json({message: err.message , type: 'error'});
    //     }
    // },

        loginAdmin: async (req: any, res: any) => {
            try{ 
                
                 const admin = await loginUseCase.execute(req.body); 

                 if(!admin) {
                    res.json({message: 'admin not found', type: 'error'})
                 } else { 

                    res.cookie("jwtA", admin.jwt, {
                        httpOnly: true, 
                        sameSite: "None", 
                        secure: true, 
                        maxAge: 24 * 60 * 60 * 1000
                      })

                    return res.json({message: "successfully login",admin: admin, type: 'success'});
                
               }
            }catch(err: any) { 
                res.json({message: err.message, type: 'error'}); 
            }
        }, 


        getDashboard: async (req: any, res: any) => {
            try{  
               const clientsAndUsers = await getDashboardUseCase.execute();
 

               res.cookie("jwtA", req.admin.accessToken, {
                httpOnly: true, 
                sameSite: "None", 
                secure: true, 
                maxAge: 24 * 60 * 60 * 1000
              }
            );
            return res.json({message: "successfully login",data: clientsAndUsers, type: 'success'});
              

            }catch(err: any) {
                res.json({message: err.message, type: 'error'})
            }
        },


        getAllUsers: async(req: any, res: any) => {
            try{

                const page: number = parseInt(req.query.page);

                const users = await getAllUsersUseCase.execute(page); 

                res.json({message: "Successfully fetched all the users", data: users, type: 'success'});
                
            }catch(err: any) {
                res.json({message: err.message , type: 'error'});
            }
        },


        getAllClients: async(req: any, res: any) => {
            try{

                const clients = await getAllClientsUseCase.execute(); 

                res.json({message: "Successfully fetched all the clients", data: clients, type: 'success'});
                
            }catch(err: any) {
                res.json({message: err.message , type: 'error'});
            }
        },

        blockUser: async(req: any, res: any) => {
            try{

                 const user = await blockUserUseCase.execute(req.params);

                 if(user) {
                    res.json({message: 'User blocked successfully ', type: 'success'})
                 }

            }catch(err: any) {
                res.json({message: err.message, type: 'error'})
            }
        },
        

        unBlockUser: async(req: any, res: any) => {
            try{

                 const user = await unBlockUserUseCase.execute(req.params);

                 if(user) {
                    res.json({message: 'User unblocked successfully ', type: 'success'})
                 }

            }catch(err: any) {
                res.json({message: err.message, type: 'error'})
            }
        },
        

        blockClient: async(req: any, res: any) => {
            try{
   
                 const client = await blockClientUseCase.execute(req.params);

                 if(client) {
                    res.json({message: 'Client blocked successfully ', type: 'success'})
                 }

            }catch(err: any) {
                res.json({message: err.message, type: 'error'})
            }
        },
        

        unBlockClient: async(req: any, res: any) => {
            try{

                 const client = await unBlockClientUseCase.execute(req.params);

                 if(client) {
                    res.json({message: 'client unblocked successfully ', type: 'success'})
                 }

            }catch(err: any) {
                res.json({message: err.message, type: 'error'})
            }
        },
        

        logoutAdmin: async (req: any, res: any) => {
            try{
   
                res.clearCookie("jwtA", { path: '/'});  
                
               res.json({message: 'successfully loggedout', type: 'success'});

            }catch(err: any) {
                res.json({message: err.message, type: 'error'})
            }
        },
        

        verifyAccept: async (req: any, res: any) => {
            try{
          
                  const response = await verifyAcceptUseCase.execute(req.body);
                   

                  res.json({ message: 'client verified ', success: true });
            }catch(err: any) {
                res.json({ message: err.message, success: false })
            }
        },
        

        getRequests: async (req: any, res: any) => {
            try{
                  const response = await getAllRequestsUseCase.execute(); 

                  res.json({ message: 'Successfully loaded all requests ',data: response, type: 'success'});
            }catch(err: any) {
                res.json({ message: err.message, type: 'error'})
            }
        },
        

        getRequestedClient: async (req: any, res: any) => {
            try{
                const { clientId } = req.params; 
                  const response = await getRequestedClientUseCase.execute(clientId); 

                  res.json({ message: 'Successfully loaded all requests ',data: response, success: true});
            }catch(err: any) {
                res.json({ message: err.message, success: false })
            }
        },
        

        viewRoleInfo: async (req: any, res: any) => {
            try{
                const { roleId, roleInfo } = req.params; 
                  const response = await viewRoleInfoUseCase.execute(roleId, roleInfo); 

                  res.json({ message: 'Successfully loaded all requests ',data: response, success: true});
            }catch(err: any) {
                res.json({ message: err.message, success: false })
            }
        },

        getWallet: async (req: any, res: any) => {
            try{
                 
                  const response = await getWalletUseCase.execute(); 

                  res.json({ message: 'Successfully loaded all requests ', data: response, success: true});
            }catch(err: any) {
                res.json({ message: err.message, success: false })
            }
        },

    }