import { Client } from "../../../domain/entities/Client";

export interface ClientRepository {
  editClientProfile(clientId: string, clientData: Client, unChangedData: Client): Client;
}

export class EditClientProfile {
  constructor(private clientRepository: ClientRepository) { }

  async execute(clientId: string, clientData: any) { 
    const unChangedData = JSON.parse(JSON.stringify(clientData.editData));
    for (let value in clientData.editData) {
      if (clientData.editData[value] == "") {
        clientData.editData[value] = clientData.unhangedData[value];
      }
    } 
    const client = await this.clientRepository.editClientProfile(
      clientId,
      clientData.editData,
      unChangedData
    );
  }
}
