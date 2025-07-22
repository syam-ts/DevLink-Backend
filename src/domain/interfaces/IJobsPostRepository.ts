import { IJobPostDocument } from "../entities/JobPost";

 

export interface IJobPostRepository {
    createJobPost(
        clientId: string,
        data: IJobPostDocument
    ): Promise<IJobPostDocument>;

    listAllJobs(clientId: string): Promise<IJobPostDocument[]>;

    trendingJobs(): Promise<IJobPostDocument[]>;

    findAllJobs(): Promise<IJobPostDocument[]>;

    getSelectedJobs(
        clientId: string,
        jobType: string,
        currentPage: number
    ): Promise<{ jobs: IJobPostDocument[]; totalPages: number }>;

    inviteJobsList(clientId: string): Promise<IJobPostDocument[]>;

    getSingleJobPost(jobPostId: string): Promise<IJobPostDocument>;
}
