import { JobPostDocument } from "../../../domain/entities/JobPost";
import { IJobPostRepository } from "../../../domain/interfaces/IJobsPostRepository";

export class CreateJobPost {
    constructor(private jobPostRepository: IJobPostRepository) { }

    execute(clientId: string, postData: JobPostDocument) {
        return this.jobPostRepository.createJobPost(clientId, postData);
    }
}
