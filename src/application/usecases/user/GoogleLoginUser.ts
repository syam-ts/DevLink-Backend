import { User } from "../../../domain/entities/User";
 

export interface UserRepositary {
  createUser(user: User): Promise<User>;
  findUserByOnlyEmail(
    email: string,
    name: string,
    password: any
  ): Promise<User | null>;
}

export class GoogleLoginUser {
  constructor(private userRepositary: UserRepositary) {}

  async execute(user: User) {
    const { email, name, password } = user;

    const userGoogleLogin = await this.userRepositary.findUserByOnlyEmail(
      email,
      name,
      password
    );

    return userGoogleLogin;
  }
}
