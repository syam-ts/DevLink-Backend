import { IJobPostRepository } from "../../../domain/interfaces/IJobsPostRepository";

export class GetSingleJobPostClient {
    constructor(private jobpostRepository: IJobPostRepository) { }

    execute(jobPostId: string) {
        return this.jobpostRepository.getSingleJobPost(jobPostId);
    }
}
