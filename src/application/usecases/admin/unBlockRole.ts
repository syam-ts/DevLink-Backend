 
export interface AdminRepositary {
    unBlockUser(userId: string): void;
    unBlockClient(clientId: string): void;
}

export class UnBlockUser {
    constructor(private adminRepositary: AdminRepositary) { }

    async execute(userId: string) { 
        const blockedUser = await this.adminRepositary.unBlockUser(userId);

        return blockedUser;
    }
}

export class UnBlockClient {
    constructor(private adminRepositary: AdminRepositary) { }

    async execute(clientId: string) { 
        const blockedClient = await this.adminRepositary.unBlockClient(clientId);

        return blockedClient;
    }
}
