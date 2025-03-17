import { User } from "../../../domain/entities/User";



export interface ClientRepository {
    getUserProfile(userId: string): User
};


export class GetUserProfileClient {
    constructor( private clientRepository: ClientRepository) {};

    async execute(userId: string) {
        const user = await this.clientRepository.getUserProfile(userId);
 
        return user;
    }
}