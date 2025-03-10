export interface UserRepositary {
  boostSuccess(userId: string): void;
}

export class BoostSuccess {
  constructor(private userRepositary: UserRepositary) {}

  async execute(userId: string) {
    const updateUser = await this.userRepositary.boostSuccess(userId);

    return updateUser;
  }
}
