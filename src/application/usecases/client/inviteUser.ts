 
import { IInviteRepository } from "../../../domain/interfaces/IInviteRepository";

export class InviteUser {
  constructor(private inviteRepository: IInviteRepository) { }

  execute(
    userId: string,
    clientId: string,
    jobPostId: string,
    description: string
  ) {
    if (!jobPostId) {
      throw new Error("Please select a jobPost");
    }

    if (description.length < 10 && description.length < 30) {
      throw new Error("Description should be between 10 to 30 characters");
    }

    return this.inviteRepository.inviteUser(
      userId,
      clientId,
      jobPostId,
      description
    );
  }
}
