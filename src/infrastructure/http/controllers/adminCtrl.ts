
import { allAdminUseCases } from '../../../helper/controllerHelper/allCtrlConnection'

import { HttpStatusCode } from "../../../helper/constants/enums";
import { StatusMessage } from "../../../helper/constants/stausMessages";


export const adminController = {
     
    
    // signUpAdmin: async(req: any, res: any) => {
    //     try{
    //         const adminId: string = '676bfa326c2e4c9fc3afba8e'

    //         const users = await allAdminUseCases.create.execute(adminId); 

    //         res.json({message: "Successfully fetched all the users", data: users, type: 'success'});
            
    //     }catch(err: any) {
    //         res.json({message: err.message , type: 'error'});
    //     }
    // },

        loginAdmin: async (req: any, res: any) => {
            try{ 
                
                 const admin = await allAdminUseCases.loginAdminUseCase.execute(req.body); 

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
               const clientsAndUsers = await allAdminUseCases.getDashboardUseCase.execute();
 

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


                const users = await allAdminUseCases.getAllUsersUseCase.execute(req.query.page, req.query.sortType); 

                res.json({message: "Successfully fetched all the users", data: users, type: 'success'});
                
            }catch(err: any) {
                res.json({message: err.message , type: 'error'});
            }
        },


        getAllClients: async(req: any, res: any) => {
            try{
 
              
                const clients = await allAdminUseCases.getAllClientsUseCase.execute(req.query.page, req.query.sortType); 

                res.json({message: "Successfully fetched all the clients", data: clients, type: 'success'});
                
            }catch(err: any) {
                res.json({message: err.message , type: 'error'});
            }
        },

        blockUser: async(req: any, res: any) => {
            try{

                 const user = await allAdminUseCases.blockUserUseCase.execute(req.params);

                 if(user) {
                    res.json({message: 'User blocked successfully ', type: 'success'})
                 }

            }catch(err: any) {
                res.json({message: err.message, type: 'error'})
            }
        },
        

        unBlockUser: async(req: any, res: any) => {
            try{

                 const user = await allAdminUseCases.unBlockUserUseCase.execute(req.params);

                 if(user) {
                    res.json({message: 'User unblocked successfully ', type: 'success'})
                 }

            }catch(err: any) {
                res.json({message: err.message, type: 'error'})
            }
        },
        

        blockClient: async(req: any, res: any) => {
            try{
   
                 const client = await allAdminUseCases.blockClientUseCase.execute(req.params);

                 if(client) {
                    res.json({message: 'Client blocked successfully ', type: 'success'})
                 }

            }catch(err: any) {
                res.json({message: err.message, type: 'error'})
            }
        },
        

        unBlockClient: async(req: any, res: any) => {
            try{

                 const client = await allAdminUseCases.unBlockClientUseCase.execute(req.params);

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
          
                  const response = await allAdminUseCases.verifyAcceptUseCase.execute(req.body);
                   

                  res.json({ message: 'client verified ', success: true });
            }catch(err: any) {
                res.json({ message: err.message, success: false })
            }
        },
        

        getRequests: async (req: any, res: any) => {
            try{
                  const response = await allAdminUseCases.getAllRequestsUseCase.execute(); 

                  res.json({ message: 'Successfully loaded all requests ',data: response, type: 'success'});
            }catch(err: any) {
                res.json({ message: err.message, type: 'error'})
            }
        },
        

        getRequestedClient: async (req: any, res: any) => {
            try{
                const { clientId } = req.params; 
                  const response = await allAdminUseCases.getRequestedClientUseCase.execute(clientId); 

                  res.json({ message: 'Successfully loaded all requests ',data: response, success: true});
            }catch(err: any) {
                res.json({ message: err.message, success: false })
            }
        },
        

        viewRoleInfo: async (req: any, res: any) => {
            try{
                const { roleId, roleInfo } = req.params; 
                  const response = await allAdminUseCases.viewRoleInfoUseCase.execute(roleId, roleInfo); 

                  res.json({ message: 'Successfully loaded all requests ',data: response, success: true});
            }catch(err: any) {
                res.json({ message: err.message, success: false })
            }
        },

        getWallet: async (req: any, res: any) => {
            try{
                 
                  const response = await allAdminUseCases.getWalletUseCase.execute(); 

                  res.json({ message: 'Successfully loaded all requests ', data: response, success: true});
            }catch(err: any) {
                res.json({ message: err.message, success: false })
            }
        },

        
        searchUser: async (req: any, res: any) => {
            try{
                const { inputData } = req.query; 
                 
                  const response = await allAdminUseCases.searchUserUseCase.execute(inputData); 

                  res.json({ message: 'Successfully loaded search user ', data: response, success: true});
            }catch(err: any) {
                res.json({ message: err.message, success: false })
            }
        },


        sortUser: async (req: any, res: any) => {
            try{
                const { sortingType } = req.query; 
                 
                  const response = await allAdminUseCases.sortUserUseCase.execute(sortingType); 

                  res.json({ message: 'Successfully sorted user', data: response, success: true});
            }catch(err: any) {
                res.json({ message: err.message, success: false })
            }
        },



        searchClient: async (req: any, res: any) => {
            try{
                const { inputData } = req.query; 
                console.log('from ctrl : ',req.query)
                 
                  const response = await allAdminUseCases.searchClientUseCase.execute(inputData); 
                  

                  res.json({ message: 'Successfully loaded search client ', data: response, success: true});
            }catch(err: any) {
                res.json({ message: err.message, success: false })
            }
        },


        sortClient: async (req: any, res: any) => {
            try{
                const { sortingType } = req.query; 
                 
                  const response = await allAdminUseCases.sortClientUseCase.execute(sortingType); 

                  res.json({ message: 'Successfully sorted client', data: response, success: true});
            }catch(err: any) {
                res.json({ message: err.message, success: false })
            }
        },

    }