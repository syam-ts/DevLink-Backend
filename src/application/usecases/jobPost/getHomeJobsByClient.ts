 
import { IUser } from "../../../domain/entities/User"; 

export interface ClientRepository {
  findAllUsers(): Promise<IUser[]>; 
}

export class getHomeClientJobsByClient {
  constructor(private clientRepository: ClientRepository) {}

  execute() {
    return this.clientRepository.findAllUsers();
 
  }
}


