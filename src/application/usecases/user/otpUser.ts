import { IUserRepository } from "../../../domain/interfaces/IUserRepository";

export class VerifyOtp {
  constructor(private userRepository: IUserRepository) { }

  execute(user: {
    mailOtp: string;
    userOtp: string;
    user: {
      data: {
        name: string;
        email: string;
        password: string;
        mobile: number;
      };
    };
  }) {
    return this.userRepository.verifyOtp(user);
  }
}
