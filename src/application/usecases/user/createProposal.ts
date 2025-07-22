import { IUserRepository } from "../../../domain/interfaces/IUserRepository";

export class CreateProposal {
    constructor(private userRepositary: IUserRepository) { }

    execute(
        userId: string,
        jobPostId: string,
        description: string,
        bidAmount: number,
        bidDeadline: number
    ) {
        return this.userRepositary.createProposal(
            userId,
            jobPostId,
            description,
            bidAmount,
            bidDeadline
        );
    }
}
