

export interface ClientRepository {
    createJobPost(postData: any): Promise <any>
};


export class CreateJobPost {
    constructor( private clientRepository: ClientRepository) {};

    async execute(postData: any) { 

          const jobPost = await this.clientRepository.createJobPost(postData);
          return jobPost;
    }
}