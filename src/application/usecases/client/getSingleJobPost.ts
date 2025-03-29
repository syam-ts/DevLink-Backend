import { JobPostDocument } from "../../../domain/entities/JobPost";


export interface userRepository{
    getSingleJobPost(jobPostId: string): Promise<JobPostDocument>
}

export class GetSingleJobPostClient {
    constructor(private userepository: userRepository) {} 

    async execute(jobPostId: string) {
        const jobPost = await this.userepository.getSingleJobPost(jobPostId);

        return jobPost;
    }
}