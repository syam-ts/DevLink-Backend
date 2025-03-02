export interface AdminRepositary {
  blockUser(userId: string): Promise<any>;
  blockClient(clientId: string): Promise<any>;
}

export class BlockUser {
  constructor(private adminRepositary: AdminRepositary) {}

  async execute(user: any) {
    const { userId } = user;
    const blockedUser = await this.adminRepositary.blockUser(userId);

    return blockedUser;
  }
}

export class BlockClient {
  constructor(private adminRepositary: AdminRepositary) {}

  async execute(client: any) {
    const { clientId } = client;
    console.log('HTe cl', clientId)
    const blockedClient = await this.adminRepositary.blockClient(clientId);

    return blockedClient;
  }
}
