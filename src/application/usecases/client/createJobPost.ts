export interface ClientRepository {
  createJobPost(clientId: string, postData: any): Promise<any>;
}

export class CreateJobPost {
  constructor(private clientRepository: ClientRepository) {}

  async execute(clientId: string, postData: any) { 

    const jobPost = await this.clientRepository.createJobPost(
      clientId,
      postData
    );

    return jobPost;
  }
}
