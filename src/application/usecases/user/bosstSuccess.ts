 
export interface UserRepositary {
    bosstSuccess(userId: string): Promise< any >
} 



export class BosstSuccess  {
    constructor(private userRepositary: UserRepositary) {}

    async execute( userId: string ) {   

           const updateUser = await this.userRepositary.bosstSuccess(userId); 
             

           return updateUser;
    }
}