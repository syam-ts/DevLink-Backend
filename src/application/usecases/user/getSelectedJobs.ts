 


export interface UserRepositary {
    getSelectedJobs(userId: string, jobType: string): Promise< any >
} 



export class GetSelectedJobs {
    constructor(private userRepositary: UserRepositary) {}

    async execute( userId: string, jobType: string ) {   

           const response = await this.userRepositary.getSelectedJobs(userId, jobType); 
             

           return response;
    }
}