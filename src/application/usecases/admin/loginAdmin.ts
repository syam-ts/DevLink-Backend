import jwt from 'jsonwebtoken';

export interface AdminRepositary {
    findAdmin(name: string, password: string): Promise< any >;
}

export class LoginAdmin {
    constructor(private adminRepositary: AdminRepositary) {}

    async execute(admin: any) {   

        const ADMIN_ACCESS_TOKEN: any = process.env.ADMIN_ACCESS_TOKEN;
        const ADMIN_REFRESH_TOKEN: any = process.env.ADMIN_REFRESH_TOKEN;
        
        const foundAdmin = await this.adminRepositary.findAdmin(admin.name, admin.password);
 
        if (!foundAdmin) {
            throw new Error('Admin not Found');
        }  


        const accessToken = await jwt.sign({
             name: foundAdmin.name
            }, 
              ADMIN_ACCESS_TOKEN,
             { expiresIn: "10m" }
            );

            
            const refreshToken = await jwt.sign({
                name: foundAdmin.name
            },
             ADMIN_REFRESH_TOKEN,
            { expiresIn: '7d'}        
          )


        if(!accessToken) {
            throw new Error('unknown token ')
        }
        return { admin: foundAdmin, jwt: refreshToken }; 
        
    }
}