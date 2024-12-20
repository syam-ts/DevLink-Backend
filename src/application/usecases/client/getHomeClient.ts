import { Client } from '../../../domain/entities/Client';


export interface ClientRepositary {
    findAllUsers(): Promise<Client | null>;
} 

export class getHomeClient {
    constructor(private clientRepositary: ClientRepositary) { }

    async execute() {
         
        const foundUsers: any = await this.clientRepositary.findAllUsers(); 

        if (!foundUsers) {
            throw new Error('No Users are there');
        } else {
            console.log('Users Found')
        }

        return { 
            ...foundUsers
         };
    }
}