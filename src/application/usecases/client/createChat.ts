interface Members {
    members: string[];
}

export interface ClientRepository {
    createChat(members: Members): void;
}

export class CreateChat {
    constructor(private clientRepository: ClientRepository) { }

    async execute(members: Members) {
        const jobs = await this.clientRepository.createChat(members);

        return jobs;
    }
}
