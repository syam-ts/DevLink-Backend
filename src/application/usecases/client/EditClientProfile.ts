import { Admin } from "../../../domain/entities/Admin";
import { Client } from "../../../domain/entities/Client";

interface ClientData {
  editData: Partial<Client>;
  unChangedData: Client;
}


export interface ClientRepository {
  editClientProfile(clientId: string, clientData: ClientData, unChangedData: Client): Promise<Admin>;
}

export class EditClientProfile {
  constructor(private clientRepository: ClientRepository) { }

  async execute(clientId: string, clientData: ClientData) { 
    const unChangedData = JSON.parse(JSON.stringify(clientData.editData));
    for (const key of Object.keys(clientData.editData) as Array<keyof Client>) {
      if (clientData.editData[key] === "") {
        clientData.editData[key] = clientData.unChangedData[key];  
      }
    }
    const client = await this.clientRepository.editClientProfile(
      clientId,
      clientData.editData as ClientData,
      unChangedData as Client
    );
  }
}
