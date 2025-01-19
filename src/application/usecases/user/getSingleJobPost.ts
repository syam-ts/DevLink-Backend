

export interface userRepository{
    getSingleJobPost(jobPostId: string): Promise<any>
}

export class GetSingleJobPost {
    constructor(private userepository: userRepository) {} 

    async execute(jobPostId: string) {
        const jobPost = await this.userepository.getSingleJobPost(jobPostId);

        return jobPost;
    }
}