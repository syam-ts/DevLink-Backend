import { LoginAdmin } from '../../../application/usecases/admin/loginAdmin';
import { AdminRepository } from '../../../domain/interfaces/Repositaries/AdminRepository'
import { GetDashboard } from '../../../application/usecases/admin/getDashboard';


const adminRepositary = new AdminRepository();
const loginUseCase = new LoginAdmin(adminRepositary);
const getDashboardUseCase = new GetDashboard(adminRepositary);


export const adminController = {
     

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
               console.log('Teh resf token', req.cookies)
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




        logoutAdmin: async (req: any, res: any) => {
            try{
   
                res.clearCookie("jwtA", { path: '/'});  
                
               res.json({message: 'successfully loggedout', type: 'success'});

            }catch(err: any) {
                res.json({message: err.message, type: 'error'})
            }
        },
        
    }