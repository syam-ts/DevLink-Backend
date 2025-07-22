import { IUserRepository } from "../../../domain/interfaces/IUserRepository";

interface Query {
  amount: number;
  paymentType: "hourly" | "fixed";
  expertLevel: "beginner" | "intermediate" | "advanced";
}

export class GetSelectedJobs {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    userId: string,
    jobsType: string,
    query: Query,
    currentPage: number
  ) {
    const response = await this.userRepository.getSelectedJobs(
      userId,
      jobsType,
      query,
      currentPage
    );

    return response;
  }
}
