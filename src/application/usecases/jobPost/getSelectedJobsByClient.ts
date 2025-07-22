import { IJobPostRepository } from "../../../domain/interfaces/IJobsPostRepository";

export class GetSelectedJobsClientByClient {
    constructor(private jobpostRepository: IJobPostRepository) { }

    execute(clientId: string, jobsType: string, currentPage: number) {
        return this.jobpostRepository.getSelectedJobs(
            clientId,
            jobsType,
            currentPage
        );
    }
}
