 

export interface UserRepositary {
        allClients(): Promise< any >
} 



export class AllClients {
    constructor(private userRepositary: UserRepositary) {}

    async execute(  ) {   

           const response = await this.userRepositary.allClients(); 
            
    

           return response;
    }
}
