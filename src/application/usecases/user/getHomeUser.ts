import { User } from '../../../domain/entities/User';


export interface UserRepositary {
    findAllClients(): Promise<User | null>;
}


export class getHomeUser {
    constructor(private userRepositary: UserRepositary) { }

    async execute() {
        

        const foundClients: any = await this.userRepositary.findAllClients();
 
        

        if (!foundClients) {
            throw new Error('No Clients are there');
        } else {
            console.log('Clients Found')
        }

        return { 
            ...foundClients
         };
    }
}