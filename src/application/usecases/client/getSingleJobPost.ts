

export interface userRepository{
    getSingleJobPost(jobPostId: string): Promise<any>
}

export class GetSingleJobPostClient {
    constructor(private userepository: userRepository) {} 

    async execute(jobPostId: string) {
        const jobPost = await this.userepository.getSingleJobPost(jobPostId);

        return jobPost;
    }
}