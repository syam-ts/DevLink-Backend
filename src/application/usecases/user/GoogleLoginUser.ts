interface User {
  _id: string
  email: string;
  name: string;
  password: string;
  role?: string
}

export interface UserRepository { 
  findUserByOnlyEmail(
    email: string,
    name: string,
    password: string
  ): Promise<User>;
}

export class GoogleLoginUser {
  constructor(private userRepository: UserRepository) { }

  async execute(user: User) {
    const {
      email,
      name,
      password,
    }: { email: string; name: string; password: string } = user;

    const userGoogleLogin = await this.userRepository.findUserByOnlyEmail(
      email,
      name,
      password
    );

    return userGoogleLogin;
  }
};

