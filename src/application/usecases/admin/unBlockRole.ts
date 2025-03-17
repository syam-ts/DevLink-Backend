interface User {
    userId: string;
}

interface Client {
    clientId: string;
}

export interface AdminRepositary {
    unBlockUser(userId: string): void;
    unBlockClient(clientId: string): void;
}

export class UnBlockUser {
    constructor(private adminRepositary: AdminRepositary) { }

    async execute(user: User) {
        const { userId } = user;
        const blockedUser = await this.adminRepositary.unBlockUser(userId);

        return blockedUser;
    }
}

export class UnBlockClient {
    constructor(private adminRepositary: AdminRepositary) { }

    async execute(client: Client) {
        const { clientId } = client;
        const blockedClient = await this.adminRepositary.unBlockClient(clientId);

        return blockedClient;
    }
}
