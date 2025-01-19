 
export interface UserRepositary {
    bosstSuccess(userId: string): Promise< any >
} 



export class BoostSuccess  {
    constructor(private userRepositary: UserRepositary) {}

    async execute( userId: string ) {   

           const updateUser = await this.userRepositary.bosstSuccess(userId); 
             

           return updateUser;
    }
}