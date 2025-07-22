import { IUserRepository } from "../../../domain/interfaces/IUserRepository";

export class GetSingleJobPost {
    constructor(private userepository: IUserRepository) { }

    execute(jobPostId: string) {
        return this.userepository.getSingleJobPost(jobPostId);
    }
}
