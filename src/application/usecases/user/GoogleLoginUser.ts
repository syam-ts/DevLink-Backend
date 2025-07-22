import { IUserRepository } from "../../../domain/interfaces/IUserRepository";

interface IUser {
  _id: string;
  email: string;
  name: string;
  password: string;
  role?: string;
}

export class GoogleLoginUser {
  constructor(private userRepository: IUserRepository) { }

  execute(user: IUser) {
    const {
      email,
      name,
      password,
    }: { email: string; name: string; password: string } = user;

    return this.userRepository.findUserByOnlyEmail(email, name, password);
  }
}
