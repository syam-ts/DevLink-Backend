import { IUserRepository } from "../../../domain/interfaces/IUserRepository";

export class getHomeUser {
  constructor(private userRepository: IUserRepository) { }

  execute() {
    return this.userRepository.findAllClients();
  }
}

export class ListHomeJobs {
  constructor(private userRepository: IUserRepository) { }

  execute(type: string) {
    return this.userRepository.listHomeJobs(type);
  }
}
