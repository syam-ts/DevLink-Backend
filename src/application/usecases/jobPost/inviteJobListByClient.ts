import { IJobPostRepository } from "../../../domain/interfaces/IJobsPostRepository";

export class InviteJobsListByClient {
  constructor(private jobpostRepository: IJobPostRepository) {}

  execute(clientId: string) {
    return this.jobpostRepository.inviteJobsList(clientId);
  }
}
