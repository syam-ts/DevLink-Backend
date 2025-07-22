export interface ClientRepository {
    viewContracts(clientId: string, contractViewType: string, currentPage: number): void;
  }
  
  export class ViewContractsClient {
    constructor(private clientRepository: ClientRepository) {}
  
      execute(clientId: string, contractViewType: string, currentPage: number) {
     return this.clientRepository.viewContracts(
        clientId,
        contractViewType,
        currentPage
      );
   
    }
  };
  