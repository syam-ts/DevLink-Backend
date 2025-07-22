import { JobPostDocument } from "../entities/JobPost";

export interface IJobPostRepository {
    createJobPost(
        clientId: string,
        data: JobPostDocument
    ): Promise<JobPostDocument>;

    listAllJobs(clientId: string): Promise<JobPostDocument[]>;

    trendingJobs(): Promise<JobPostDocument[]>;

    findAllJobs(): Promise<JobPostDocument[]>;

    getSelectedJobs(
        clientId: string,
        jobType: string,
        currentPage: number
    ): Promise<{ jobs: JobPostDocument[]; totalPages: number }>;

    inviteJobsList(clientId: string): Promise<JobPostDocument[]>;

    getSingleJobPost(jobPostId: string): Promise<JobPostDocument>;
}
