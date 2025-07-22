import { IUserRepository } from "../../../domain/interfaces/IUserRepository";

export class SearchJobs {
    constructor(private userRepository: IUserRepository) { }

    execute(input: string) {
        return this.userRepository.searchJobsBySkills(input);
    }
}
