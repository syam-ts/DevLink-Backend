import { Client } from "../../../domain/entities/Client";

export interface AdminRepositary {
  getAllClients(page: number, sortType: string): Promise<Client>;
}

export class GetAllClients {
  constructor(private adminRepositary: AdminRepositary) {}

  async execute(page: number, sortType: string) {
    const clients = await this.adminRepositary.getAllClients(page, sortType);

    return clients;
  }
}
