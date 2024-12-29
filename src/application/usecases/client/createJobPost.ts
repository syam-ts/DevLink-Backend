

export interface ClientRepository {
    createJobPost(postData: any): Promise <any>
};


export class CreateJobPost {
    constructor( private clientRepository: ClientRepository) {};

    async execute(postData: any) {

       
          const client = await this.clientRepository.createJobPost(postData);

          console.log('The result from usecase', client)
    }
}