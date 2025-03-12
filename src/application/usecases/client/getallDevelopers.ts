import { User } from "../../../domain/entities/User";

export interface ClientRepository {
    getallDevelopers(): Promise<User>;
}

export class GetallDevelopers {
    constructor(private clientRepository: ClientRepository) { }

    async execute() {
        const allDevelopers = await this.clientRepository.getallDevelopers();

        return allDevelopers;
    }
}
