export interface UserRepositary {
  getAllInvites(userId: string): void;
}

export class GetAllInvites {
  constructor(private userRepositary: UserRepositary) {}

  async execute(userId: string) {
    const response = await this.userRepositary.getAllInvites(userId);

    return response;
  }
}
