export interface userRepository {
    getSingleJobPost(jobPostId: string): void;
}

export class GetSingleJobPost {
    constructor(private userepository: userRepository) { }

    async execute(jobPostId: string) {
        const jobPost = await this.userepository.getSingleJobPost(jobPostId);

        return jobPost;
    }
}
