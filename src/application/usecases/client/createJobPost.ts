import { JobPostDocument } from "../../../domain/entities/JobPost";

export interface ClientRepository {
  createJobPost(
    clientId: string,
    postData: JobPostDocument
  ): Promise<JobPostDocument>;
}

export class CreateJobPost {
  constructor(private clientRepository: ClientRepository) { }

  async execute(clientId: string, postData: JobPostDocument) {
    console.log("THe postdta: ",postData)
    const jobPost = await this.clientRepository.createJobPost(
      clientId,
      postData
    );

    return jobPost;
  }
}
