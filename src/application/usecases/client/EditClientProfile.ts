import { IAdmin } from "../../../domain/entities/Admin";
import { IClient } from "../../../domain/entities/Client";

 

interface ClientData {
  editData: Partial<IClient>;
  unChangedData: any;
}


export interface ClientRepository {
  editClientProfile(clientId: string, clientData: ClientData, unChangedData: IClient): Promise<IAdmin>;
}

export class EditClientProfile {
  constructor(private clientRepository: ClientRepository) { }

  async execute(clientId: string, clientData: ClientData) { 
    const unChangedData = JSON.parse(JSON.stringify(clientData.editData));
    for (const key of Object.keys(clientData.editData) as Array<keyof IClient>) {
      if (clientData.editData[key] === "") {
        clientData.editData[key] = clientData.unChangedData[key];  
      }
    }
    const client = await this.clientRepository.editClientProfile(
      clientId,
      clientData.editData as ClientData,
      unChangedData as IClient
    );
  }
}
