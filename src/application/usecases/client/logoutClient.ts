

export class LogoutClient {
    constructor(res: any) { }

    async execute(res: any) { 
        
       res.clearCookie("token",{ path: '/', expires: new Date(0) })
      
    }
}