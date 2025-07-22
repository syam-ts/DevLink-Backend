import { IJobPostRepository } from "../../../domain/interfaces/IJobsPostRepository";

export class ListAllJobsByClient {
    constructor(private jobpostRepository: IJobPostRepository) { }

    execute(clientId: string) {
        return this.jobpostRepository.listAllJobs(clientId);
    }
}
