import { IJobPostRepository } from "../../../domain/interfaces/IJobsPostRepository";

export class TrendingJobs {
    constructor(private jobpostRepository: IJobPostRepository) { }

    execute() {
        return this.jobpostRepository.trendingJobs();
    }
}
