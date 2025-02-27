export interface ClientRepository {
    viewContracts(clientId: string, contractViewType: string, currentPage: number): void;
  }
  
  export class ViewContractsClient {
    constructor(private clientRepository: ClientRepository) {}
  
    async execute(clientId: string, contractViewType: string, currentPage: number) {
      const response = await this.clientRepository.viewContracts(
        clientId,
        contractViewType,
        currentPage
      );
  
      return response;
    }
  };
  