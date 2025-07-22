 
import { User } from "../../../domain/entities/User"; 

export interface ClientRepository {
  findAllUsers(): Promise<User[]>; 
}

export class getHomeClientJobsByClient {
  constructor(private clientRepository: ClientRepository) {}

  execute() {
    return this.clientRepository.findAllUsers();
 
  }
}


