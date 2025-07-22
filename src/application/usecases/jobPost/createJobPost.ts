 
import { IJobPostDocument } from "../../../domain/entities/JobPost";
import { IJobPostRepository } from "../../../domain/interfaces/IJobsPostRepository";

export class CreateJobPost {
    constructor(private jobPostRepository: IJobPostRepository) { }

    execute(clientId: string, postData: IJobPostDocument) {
        return this.jobPostRepository.createJobPost(clientId, postData);
    }
}
