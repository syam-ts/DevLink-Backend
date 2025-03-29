 

export interface AdminRepositary {
  blockUser(userId: string): void;
  blockClient(clientId: string): void;
}

export class BlockUser {
  constructor(private adminRepositary: AdminRepositary) {}

  async execute(userId: string) { 
    const blockedUser = await this.adminRepositary.blockUser(userId);

    return blockedUser;
  }
}

export class BlockClient {
  constructor(private adminRepositary: AdminRepositary) {}

  async execute(clientId: string) { 
    const blockedClient = await this.adminRepositary.blockClient(clientId);

    return blockedClient;
  }
}
