 
export interface AdminRepositary {
    findAdmin(name: string, password: string): Promise< any >;
    findAllUsers(): Promise< any >;
    findAllClients(): Promise< any >;
    
}

export class GetDashboard {
    constructor(private adminRepositary: AdminRepositary) {}

    async execute() {    
   
        const [allUsers, allClients] = await Promise.all([
            this.adminRepositary.findAllUsers(),
            this.adminRepositary.findAllClients()
        ]); 
 
        return {
            allUsers: allUsers,
            allClients: allClients
        }
        
    }
}