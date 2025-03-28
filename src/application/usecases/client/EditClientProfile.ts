import { Client } from "../../../domain/entities/Client";

interface ClientData {
  editData: Partial<Client>;
  unhangedData: Client;
}


export interface ClientRepository {
  editClientProfile(clientId: string, clientData: Client, unChangedData: Client): Client;
}

export class EditClientProfile {
  constructor(private clientRepository: ClientRepository) { }

  async execute(clientId: string, clientData: ClientData) { 
    const unChangedData = JSON.parse(JSON.stringify(clientData.editData));
    for (const key of Object.keys(clientData.editData) as Array<keyof Client>) {
      if (clientData.editData[key] === "") {
        clientData.editData[key] = clientData.unhangedData[key]; // Ensure valid key access
      }
    }
    const client = await this.clientRepository.editClientProfile(
      clientId,
      clientData.editData as Client,
      unChangedData as Client
    );
  }
}
