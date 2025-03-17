interface User {
  userId: string
}
interface Client {
  clientId: string
}

export interface AdminRepositary {
  blockUser(userId: string): void;
  blockClient(clientId: string): void;
}

export class BlockUser {
  constructor(private adminRepositary: AdminRepositary) {}

  async execute(user: User) {
    const { userId } = user;
    const blockedUser = await this.adminRepositary.blockUser(userId);

    return blockedUser;
  }
}

export class BlockClient {
  constructor(private adminRepositary: AdminRepositary) {}

  async execute(client: Client) {
    const { clientId } = client; 
    const blockedClient = await this.adminRepositary.blockClient(clientId);

    return blockedClient;
  }
}
