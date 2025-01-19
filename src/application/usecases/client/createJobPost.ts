

export interface ClientRepository {
    createJobPost(clientId: string,postData: any): Promise <any>
    // addMoneyToAdminWallet(role: string, roleId: any, amount: number): Promise <any>
};


export class CreateJobPost {
    constructor( private clientRepository: ClientRepository) {};

    async execute(clientId: string, postData: any) { 

        //  const data = JSON.parse(postData)
 
         const payment = parseInt(postData.payment)

         
          const jobPost = await this.clientRepository.createJobPost(clientId, postData);

        //   const trasferToAdmin = await this.clientRepository.addMoneyToAdminWallet('client', clientId,  payment);
          return jobPost;
    }
}