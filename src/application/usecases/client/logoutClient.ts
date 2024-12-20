

export class LogoutClient {
    constructor(res: any) { }

    async execute(res: any) {
        console.log('reached')
       console.log('the cook', res.cookie)
       res.clearCookie("token",{ path: '/', expires: new Date(0) })
      
    }
}