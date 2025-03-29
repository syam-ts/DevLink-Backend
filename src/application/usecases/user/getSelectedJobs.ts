import { JobPostDocument } from "../../../domain/entities/JobPost";

export interface UserRepository {
  getSelectedJobs(
    userId: string,
    jobsType: string,
    query: Query,
    currentPage: number
  ): Promise<{ jobs: JobPostDocument[]; totalPages: number | undefined }>;
}

interface Query {
  amount: number;
  paymentType: "hourly" | "fixed";
  expertLevel: "beginner" | "intermediate" | "advanced";
}

export class GetSelectedJobs {
  constructor(private userRepository: UserRepository) { }

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
