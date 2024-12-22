import { LoginAdmin } from '../../../application/usecases/admin/loginAdmin';
import { AdminRepository } from '../../../domain/interfaces/Repositaries/AdminRepository'


const adminRepositary = new AdminRepository();
const loginUseCase = new LoginAdmin(adminRepositary);


export const adminController = {
     

        loginAdmin: async (req: any, res: any) => {
            try{ 
                 const admin = await loginUseCase.execute(req.body); 

                 console.log('Finally ', admin)

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


        // getDashboard: async (req: any, res: any) => {
        //     try{ 
               
        //        const clients = await getHomeUseCase.execute();

        //        res.cookie("jwtU", req.user.accessToken, {
        //         httpOnly: true, 
        //         sameSite: "None", 
        //         secure: true, 
        //         maxAge: 24 * 60 * 60 * 1000
        //       }
        //     );
        //     return res.json({message: "successfully login",data: clients, type: 'success'});
              

        //     }catch(err: any) {
        //         res.json({message: err.message, type: 'error'})
        //     }
        // },




        logoutAdmin: async (req: any, res: any) => {
            try{
 
               
                console.log('Before', req.cookies.jwtA);  
                
                res.clearCookie("jwtA", { path: '/'}); 
                  

                console.log('Cookies after clear:', req.cookies.jwtA);
                
               res.json({message: 'successfully loggedout', type: 'success'});

            }catch(err: any) {
                res.json({message: err.message, type: 'error'})
            }
        },
        
    }