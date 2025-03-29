import { JobPostDocument } from "../../../domain/entities/JobPost";

export interface UserRepository {
    searchJobsByTitle(input: string): Promise<JobPostDocument[]>;
}

export class SearchJobs {
    constructor(private userRepository: UserRepository) { }

    async execute(input: string) {
        const jobs = await this.userRepository.searchJobsByTitle(input);

        return jobs;
    }
}
